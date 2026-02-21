import { useReducer } from "react";
import { useForm } from "react-hook-form";

const initState = {
  step: 1,
  customerInfo: {
    name: "",
    email: "",
    phone: "",
  },
  addressInfo: {
    city: "",
    zip: "",
  },
};

function reducer(state, action) {
  switch (action.type) {
    case "wizard/save":
      return {
        ...state,
        [action.section]: action.payload,
      };
    case "wizard/prev":
      return {
        ...state,
        step: state.step - 1,
      };
    case "wizard/next":
      return {
        ...state,
        step: state.step + 1,
      };
    default:
      return state;
  }
}

export function CustomerInfo({ data, dispatch }) {
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm({
    defaultValues: data.customerInfo,
  });

  function onSubmitHandler(data) {
    dispatch({
      type: "wizard/save",
      section: "customerInfo",
      payload: data,
    });
    dispatch({ type: "wizard/next" });
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <h2>Customer Information</h2>

        <div>
          <label>Full Name</label>
          <input type="text" {...register("name", { required: true })} />
        </div>

        <div>
          <label>Email</label>
          <input type="text" {...register("email", { required: true })} />
        </div>

        <div>
          <label>Phone</label>
          <input type="text" {...register("phone", { required: true })} />
        </div>

        <button disabled={!isValid} type="submit">
          Next
        </button>
      </form>
    </>
  );
}

export function AddressInfo({ data, dispatch }) {
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm({
    defaultValues: data.addressInfo,
  });

  function onSubmitHandler(data) {
    dispatch({
      type: "wizard/save",
      section: "addressInfo",
      payload: data,
    });
    dispatch({ type: "wizard/next" });
  }
  return (
    <>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <h2>Address Information</h2>

        <div>
          <label>City</label>
          <input type="text" {...register("city", { required: true })} />
        </div>
        <div>
          <label>Zip</label>
          <input type="text" {...register("zip", { required: true })} />
        </div>

        <button type="button" onClick={() => dispatch({ type: "wizard/prev" })}>
          Prev
        </button>
        <button disabled={!isValid} type="submit">
          Next
        </button>
      </form>
    </>
  );
}

export function Review({ data }) {
  return (
    <>
      Name: {data.customerInfo.name}
      Zip:{data.addressInfo.zip}
    </>
  );
}

export default function Wizard() {
  const [state, dispatch] = useReducer(reducer, initState);
  const { step } = state;
  return (
    <>
      {step === 1 && <CustomerInfo data={state} dispatch={dispatch} />}
      {step === 2 && <AddressInfo data={state} dispatch={dispatch} />}
      {step === 3 && <Review data={state} />}
    </>
  );
}
