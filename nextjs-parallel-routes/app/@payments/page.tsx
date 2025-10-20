import { Payment, columns } from "./columns"
import { DataTable } from "./data-table"

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "a91bc47d",
      amount: 250,
      status: "success",
      email: "sarah@example.com",
    },
    {
      id: "e38fa21b",
      amount: 75,
      status: "failed",
      email: "john@example.org",
    },
    {
      id: "c52db94e",
      amount: 420,
      status: "processing",
      email: "lisa@example.net",
    },
    {
      id: "f67ac08c",
      amount: 180,
      status: "pending",
      email: "alex@example.com",
    },
  ]
}

export default async function Payments() {
  const data = await getData()

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}
