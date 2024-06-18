import { getPartialColumns } from "../util/filters-util"
import { useGetDataQuery } from "../util/query-util"
import Table from "../features/filters/Table"
import Spinner from "./Spinner"
import "./Dashboard.css"

export default function Dashboard() {
  const {
    data = [],
    error,
    isFetching,
    isSuccess,
    isError,
  } = useGetDataQuery("tickets", {
    pending: true,
  })

  let content

  if (isFetching) {
    content = <Spinner />
  } else if (isError) {
    content = <div>{error.toString()}</div>
  } else if (isSuccess) {
    const columns = getPartialColumns("tickets")

    content = <Table route="tickets" columns={columns} data={data} />
  }

  return (
    <div className="dashboard">
      <h1 className="header">Dashboard</h1>
      <div className="open-tickets">
        <h2>Open Tickets</h2>
        {content}
      </div>
    </div>
  )
}
