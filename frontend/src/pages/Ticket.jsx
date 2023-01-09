import { useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getTicket, closeTicket, reset } from '../features/tickets/ticketSlice'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'
import { toast } from 'react-toastify'

const Ticket = () => {

  const {ticket, isLoading, isSuccess, isError, message} = useSelector((state) => state.tickets)
  const params = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {ticketId} = useParams()

  useEffect(() => {
    if(isError){
      toast.error(message)
    }
    dispatch(getTicket(ticketId))
    // eslint-disable-next-line
  }, [isError, message, ticketId])


  const onTicketClose = () => {
    dispatch(closeTicket(ticketId))
    toast.success('Ticket Closed')
    navigate('/tickets')
  }


  if(isLoading){
    return <Spinner />
  }

  if(isError){
    return (
    <h3>Something went wrong with the data fetch</h3>
  )
  }


  return (
    <div>
      <div className="ticket-page">
        <header className="ticket-header">
          <BackButton url='/tickets' />
          <h2>
            Ticket ID: ${ticket._id}
            <span className={`status status-${ticket.status}`}>{ticket.status}</span>
          </h2>
          <h3>Date Submitted: {new Date(ticket.createdAt).toLocaleString('en-US')}</h3>
          <h3>Product: {ticket.product}</h3>
          <hr />
          <div className="ticket-desc">
            <h3>Description of Issue</h3>
            <p>{ticket.description}</p>
          </div>
        </header>
        {ticket.status !== 'closed' && (
          <button className="btn btn-block btn-danger" onClick={onTicketClose}>Close Ticket</button>
        )}
      </div>
    </div>
  )
}
export default Ticket