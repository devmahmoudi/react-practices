import { Link } from "react-router-dom";

const CreateBlog = () => {
    return (
        <form>
            <div className="form-group">
                <label for="title">
                    عنوان :
                </label>
                <input name="title" type="text" id="title"/>
            </div>
            <div className="form-group">
                <label for="body">
                    متن :
                </label>
                <textarea name="body" id="body" rows={15}></textarea>
            </div>
            <div className="form-group">
                <button style={{marginBottom: 0}}>ذخیره</button>
                <Link to={'/blogs'} style={{marginTop: 0, marginRight: 10, backgroundColor: "yellow", padding: 7, borderRadius: 10}}>انصراف</Link>
            </div>
        </form>
    )
}

export default CreateBlog;