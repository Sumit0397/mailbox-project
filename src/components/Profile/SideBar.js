import React ,{Fragment} from 'react';
import classes from "./SideBar.module.css";
import { Button } from "react-bootstrap";
import { inboxActions , inboxItemFill } from '../../store/inboxSlice';
import { useDispatch , useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const SideBar = () => {

    
  const navigate = useNavigate();
  const auth = useSelector(state => state.auth);
  const inboxItems = useSelector((state) => state.inbox.inboxItems);
  const dispatch = useDispatch();

  const composeClickHandler = () =>{
    navigate('/profile/compose', {replace: true});
  }

  const inboxClickHandler = async () => {
    navigate("/profile/inbox", { replace: true });
    dispatch(inboxItemFill(auth.email));
  }

  let totalUnread = 0;
  inboxItems.forEach((element) => {
    if (element[1].unread) {
      totalUnread++;
    }

  });
  
    return (
        <Fragment >
            <div className={classes.mailCon}>
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <Button variant="primary" onClick={composeClickHandler}>
                                    Compose
                                </Button>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Button variant="outline-secondary" onClick={inboxClickHandler}>Inbox</Button>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Button variant="outline-success">Sentbox</Button>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Button variant="outline-warning">Outbox</Button>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Button variant="outline-danger">Spam</Button>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Button variant="outline-info">Recyle bin</Button>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Button variant="outline-dark">Starred</Button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </Fragment>
    )
}

export default SideBar
