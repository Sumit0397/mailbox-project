import React ,{useState} from 'react';
import classes from "./Inbox.module.css";
import { Table } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { GoDotFill, GoDot } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { inboxActions } from '../../store/inboxSlice';
import { MdDelete } from "react-icons/md";


const Inbox = () => {

    const inboxItem = useSelector((state) => state.inbox.inboxItems);
    // console.log(inboxItem);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);

    const clickEmailHanler = async (item) => {
        console.log(item);
        navigate("/profile/inbox/message", { replace: true });
        dispatch(inboxActions.addMessageOpen(item));

        const email = auth.email.replace(/[.@]/g, "");
        try {
            const resEmail = await fetch(
                `https://mailbox-project-589e9-default-rtdb.firebaseio.com/${email}/recievedEmails/${item[0]}.json`,
                {
                    method: "PUT",
                    body: JSON.stringify({
                        id: item[1].id,
                        from: item[1].from,
                        emailSub: item[1].emailSub,
                        emailContent: item[1].emailContent,
                        date: item[1].date,
                        unread: false,
                    }),
                    headers: {
                        "content-type": "application/json",
                    },
                }
            );
        } catch (error) {
            alert(error);
        }
    };

    const clickDeleteHandler = async (deleteItem) => {
        // console.log(item);
        dispatch(inboxActions.removeItem(deleteItem));
        const email = auth.email.replace(/[\.@]/g, "");
        try {
            const resDlt = await fetch(`https://mailbox-project-589e9-default-rtdb.firebaseio.com/${email}/recievedEmails/${deleteItem[0]}.json`, {
                method: 'DELETE'
            })
        } catch (error) {
            alert(error);
        }
    };

    return (
        <div className={classes.inboxCon}>
            <h3>Inbox</h3>
            {loading && <h5>Loading...</h5>}
            <Table striped hover>
                <thead>
                    <tr>
                        <th>Status</th>
                        <th>Subject</th>
                        <th>Sender</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {inboxItem.map((i) => (
                        <tr
                            onClick={() => clickEmailHanler(i)}
                            className={i[1].unread ? classes.unreadRow : ""}
                            key={i[0]}
                        >
                            <td>
                                {i[1].unread ? (
                                    <GoDotFill style={{ color: "blue" }} />
                                ) : (
                                    <GoDot />
                                )}
                            </td>
                            <td>{i[1].emailSub}</td>
                            <td>{i[1].from}</td>
                            <td>{i[1].date}</td>
                            <td>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        clickDeleteHandler(i);
                                    }}
                                >
                                    <MdDelete style={{ color: "red", border: "black" }} />
                                </button>
                            </td>
                        </tr>
                    ))}

                </tbody>
            </Table>
        </div>
    )
}

export default Inbox
