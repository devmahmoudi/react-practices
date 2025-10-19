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
      id: "a17bf2c9",
      amount: 245,
      status: "success",
      email: "sara.jones@example.com",
    },
    {
      id: "c3a9d0b8",
      amount: 480,
      status: "processing",
      email: "alex.smith@example.com",
    },
    {
      id: "e54bb5a2",
      amount: 760,
      status: "success",
      email: "linda.chan@example.com",
    },
    {
      id: "b89a2ccf",
      amount: 60,
      status: "failed",
      email: "tommy89@example.com",
    },
  ]
}

export default async function DemoPage() {
  const data = await getData()

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}
