import axios from "axios";
import useSWR from "swr";

const fetcher = (...args) => axios.get(...args).then(res => res.data)

const UserIndexSwr = () => {
    const { data, error, isLoading } = useSWR('http://localhost:9000/users', fetcher)

    if (error)
        return (<h1>There is a problem. Message: {error.message}</h1>)

    if (isLoading)
        return (<button className="btn btn-primary">Loading ...</button>)

    return (
        <div className="p-4">
            {
                data.map((user, indes) => (
                    <div key={user.id}>
                        <h3>
                            {user.name}
                        </h3>
                        <ul>
                            <li>Name {user.name}</li>
                            <li>Family {user.family}</li>
                            <li>Job {user.job}</li>
                        </ul>
                    </div>
                ))
            }
        </div>
    )
}

export default UserIndexSwr;