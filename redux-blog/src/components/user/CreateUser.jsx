import { useState } from "react";

const CreateUser = ({ onSubmit }) => {
  const [fullname, setFullname] = useState();

  const canSave = fullname && fullname.trim().length > 0;

  return (
    <div style={{ margin: 10 }}>
      <label>نام نویسنده جدید</label>
      <input
        type="text"
        name="fullname"
        onChange={(e) => setFullname(e.target.value)}
        placeholder="لطفا نام نویسنده جدید را وارد کنید ..."
      />
      <button disabled={!canSave} onClick={() => onSubmit(fullname)}>
        ذخیره
      </button>
    </div>
  );
};

export default CreateUser;
