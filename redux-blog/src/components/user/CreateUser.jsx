import { useState } from "react";

const CreateUser = ({ onSubmit }) => {
  const [fullname, setFullname] = useState();

  const canSave = fullname && fullname.trim().length > 0;

  const handleSubmit = () => {
    onSubmit(fullname);

    setFullname("");
  };

  return (
    <div style={{ margin: 10 }}>
      <label>نام نویسنده جدید</label>
      <input
        type="text"
        name="fullname"
        value={fullname}
        onChange={(e) => setFullname(e.target.value)}
        placeholder="لطفا نام نویسنده جدید را وارد کنید ..."
      />
      <button disabled={!canSave} onClick={handleSubmit}>
        ذخیره
      </button>
    </div>
  );
};

export default CreateUser;
