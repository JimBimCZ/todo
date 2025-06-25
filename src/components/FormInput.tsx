import type { FC } from "react";

export const FormInput: FC = () => {
  return (
    <div className="form-control w-full max-w-xs">
      <label className="label">
        <span className="label-text">Let's add a new task</span>
      </label>
      <input
        type="text"
        placeholder="New task goes here"
        className="input input-bordered w-full max-w-xs"
      />
    </div>
  );
};
