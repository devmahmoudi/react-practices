import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {blogAdded} from "../features/blogSlice"

const CreateBlog = () => {
    const [data, setData] = useState({
        title: '',
        body: ''
    })

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const handleChange = (e) => {
        setData({...data, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(data.title && data.body){
            dispatch(blogAdded(data.title, data.body))

            navigate('/blogs')
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label for="title">
                    عنوان :
                </label>
                <input name="title" type="text" id="title" onChange={handleChange}/>
            </div>
            <div className="form-group">
                <label for="body">
                    متن :
                </label>
                <textarea name="body" id="body" rows={15} onChange={handleChange}></textarea>
            </div>
            <div className="form-group">
                <button style={{marginBottom: 0}} type="submit">ذخیره</button>
                <Link to={'/blogs'} style={{marginTop: 0, marginRight: 10, backgroundColor: "yellow", padding: 7, borderRadius: 10}}>انصراف</Link>
            </div>
        </form>
    )
}

export default CreateBlog;