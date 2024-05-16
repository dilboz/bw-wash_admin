import React from 'react'
import { Page } from '@components'
import { MainLayout } from '@layouts'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@store'
import { usersControllers } from '@controllers'

export const UserById = () => {

	const dispatch = useAppDispatch()
	const { id } = useParams()
	const { dataById } = useAppSelector(state => state.users)

	React.useEffect(() => {
		if (!id) return 
		dispatch(usersControllers.getById(id))
	}, [dispatch, id])

	return (
    <Page title={"Пользователь - " + id}>
      <MainLayout>
				<div className='user'>
					{dataById?.name &&
						<div className="user__info">
							<div className="user__title">
								Имя
							</div>
							<div className='user__value'>
								{dataById?.name}
							</div>
						</div>
					}
					{dataById?.lastName &&
						<div className="user__info">
							<div className="user__title">
								Фамилия
							</div>
							<div className='user__value'>
								{dataById?.lastName}
							</div>
						</div>
					}
					{dataById?.email && 
						<div className="user__info">
							<div className="user__title">
								Почта
							</div>
							<div className='user__value'>
								{dataById?.email}
							</div>
						</div>
					}
					{dataById?.address && 
						<div className="user__info">
							<div className="user__title">
								Адрес
							</div>
							<div className='user__address'>
								{dataById?.address}
							</div>
						</div>
					}
					{dataById?.phone && 
						<div className="user__info">
							<div className="user__title">
								Телефон
							</div>
							<div className='user__value'>
								{dataById?.phone}
							</div>
						</div>
					}
				</div>
      </MainLayout>
    </Page>
	)
}