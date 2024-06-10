import { IProductCard } from "@interfaces";
import { Image, Link } from "@components";
import { AppPaths } from "@constants";
import { BaseUrl, BaseUrlWithoutApi } from "@utils/BaseUrl";
import { Switch } from "./Switch";
import axios from "axios";

interface IProps extends IProductCard { }

export const Prodcard: React.FC<IProps> = (props): JSX.Element => {
  return (
    <div className="prodcard">
      <div className="prodcard__img-wrap">
        <Image
          width={120}
          className="prodcard__img"
          src={BaseUrlWithoutApi + props.imgSrc}
          alt="product thumnail"
        />
      </div>

      <div className="prodcard__info">
        <div className="prodcard__title">
          <h3 className="prodcard__name">{props?.name?.length > 40 ? props.name?.substring(0, 40) + '...' : props?.name}</h3>
          <div className="prodcard__subtitle">
            {props.isNew && <p className="prodcard__is-new">новинка</p>}
            {props.discount !== "0" && (
              <p className="prodcard__discount">акция {props.discount}%</p>
            )}
          </div>
        </div>

        <p className="prodcard__price">{props.price} c.</p>
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <div style={{ fontWeight: "bold", marginRight: "1rem" }}>
            Скрыть товар
          </div>

          <Switch
            checked={props.isHidden}
            onChange={(val) => {
              axios.get(
                `${BaseUrl}/product/hideproduct?id=${props.id}&Hide=${val}`
              );
            }}
          />
        </div>
        <div className="prodcard__date">
          {new Date(props.date || "").toLocaleDateString()}
        </div>
        <div className="prodcard__buttons">
          <Link
            to={AppPaths.editProduct + "/" + props.id}
            className="prodcard__button button button-outline-primary"
          >
            Изменить
          </Link>

          <button
            className="prodcard__button button button-outline-warning"
            onClick={props.onDelete}
          >
            Удалить
          </button>
        </div>
      </div>
    </div>
  );
};
