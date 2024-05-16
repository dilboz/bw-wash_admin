import React from "react";
import { Link, Page, Pagination, Search } from "@components";
import { MainLayout } from "@layouts";
import { useAppDispatch, useAppSelector } from '@store';
import { usersControllers } from '@controllers';
import { useNavigate } from 'react-router-dom';
import { IUserItem, IUsersParams } from '@interfaces';
import { AppPaths } from '@constants';
import { QueryToObject, QueryToString } from '@functions';
import { DeliveryTypesSkeleton } from '@skeletons';

const initialParams: IUsersParams = {
  page: 1,
  query: ""
};

export const Users: React.FC = (): JSX.Element => {

  const dispatch = useAppDispatch()

  const [params, setParams] = React.useState<IUsersParams>(initialParams);

  const { data, pending, pageCount } = useAppSelector((state) => state.users);
  const { roleName } = useAppSelector((state) => state.user);

  const navigate = useNavigate();

  const handleSetParams = (
    state: keyof IUsersParams,
    value: number | string
  ): void => {
    setParams((prev) => ({ ...prev, [state]: value }));
  };

  const handleChangeRole = React.useCallback((roleId, id) => {
    dispatch(usersControllers.edit(params, roleId, id ));
  }, [dispatch, params])

  React.useEffect(() => {
    if (!params) return;
    navigate(AppPaths.users + "?" + QueryToString(params));
    dispatch(usersControllers.get(params));
  }, [navigate, dispatch, params]);

  React.useMemo(() => {
    const urlParams = QueryToObject();

    setParams({
      page: Number(urlParams.page || initialParams.page),
      query: urlParams.query || initialParams.query
    });
  }, []);

  return (
    <Page title="Пользователи">
      <MainLayout>
        <div className="users">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h1 className="title">Пользователи</h1>
          </div>
          <Search
            className="products__search mb-2"
            value={params?.query || ""}
            onChange={(v: string) => handleSetParams("query", v)}
            placeholder="Поиск по имени"
          />
          <div className="deliveryType__list">
            {pending && <DeliveryTypesSkeleton />}
            {!pending &&
              data.map((item: IUserItem) => (
                <div className="user__item" key={item.id}>
                  <Link to={'/users/'+item.id} className="user__item-info">
                    <div className="user__item-name">
                      <span>{item.firstName}</span> 
                      <span>{item.lastName}</span> 
                    </div>
                  </Link>
                  {roleName === 1 && 
                    <div className="user__item-tools">
                      <Dropdown id={item.id} roleName={item.roleName} onChange={handleChangeRole} />
                    </div>
                  }
                </div>
              ))}
          </div>
          <Pagination
            className="products__pagination mt-2"
            page={Number(params?.page || 1)}
            totalPages={pageCount}
            onPageChange={(p: number) =>
              handleSetParams("page", p)
            }
          />
        </div>
      </MainLayout>
    </Page>
  );
};

const Dropdown: React.FC<{
  id: string;
  roleName: string,
  onChange: (roleId: number, id: string) => void
}> = (props) => {
  const [open, setOpen] = React.useState<boolean>(false);

  React.useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (!e.target.closest('#userToolsDropdown-'+props.id))
        setOpen(false)
    }
    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, [props.id]);

  return (
    <div id={"userToolsDropdown-"+props.id} className="userToolsDropdown">

    <button className="userToolsDropdown__label" onClick={() => setOpen(!open)}>
      {props.roleName}
    </button>

    {open && 
      <div className="userToolsDropdown__menu">
        <button className="userToolsDropdown__item" onClick={() => {
          setOpen(false)
          props.onChange(2, props.id)
        }}>
          Администратор
        </button>
        <button className="userToolsDropdown__item" onClick={() => {
          setOpen(false)
          props.onChange(3, props.id)
        }}>
          Пользователь
        </button>
      </div>
    }

    </div>
  )
}