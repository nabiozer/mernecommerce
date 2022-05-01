

import React,{useEffect} from 'react'
import {Link,useLocation,useHistory} from 'react-router-dom'
import { LinkContainer } from "react-router-bootstrap";
import {Table,Button} from 'react-bootstrap';
import {useDispatch,useSelector} from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getOrdersHandler } from '../store/order-action'

const OrderListPage = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const user = useSelector(state => state.user)
    const {users,userInfo} = user;

    const order = useSelector(state => state.order)
    const {orders, error, loading } = order;

  
    useEffect(() => {
        if(user.userInfo && user.userInfo.isAdmin) {
        dispatch(getOrdersHandler());

        } else {
            history.push('/login')
        }
    }, [dispatch,history,userInfo]);
  return (
    <>
        <h1>Orders</h1>
        {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message>:
        (<Table striped bordered hover responsive className="table-sm">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>USER</th>
                    <th>DATE</th>
                    <th>TOTAL PRICE</th>
                    <th>DELIVERED</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {orders.map(order => (
                    <tr key={order._id}>
                        <td>{order._id}</td>
                        <td>{order.user.name}</td>
                        <td>{order.createdAt.substring(0,10)}</td>
                        <td>${order.totalPrice}</td>
                        <td>{order.isPaid ? order.paidAt.substring(0,10) : (
                            <i className="fas fa-times" stlye={{color:'red'}}></i>
                        )}</td>

                        <td>{order.isDelivered ? order.deliveredAt.substring(0,10) : (
                            <i className="fas fa-times" stlye={{color:'red'}}></i>
                        )}</td>
                        <td>
                            <LinkContainer to={`/admin/order/${order._id}`}>
                                <Button variant="light" className='btn-sm'>
                                    Details
                                </Button>
                            </LinkContainer>
                            <Button variant="danger" className='btn-sm' >
                                <i className="fas fa-trash"></i>
                            </Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>)
        }

    </>
  )
}

export default OrderListPage 