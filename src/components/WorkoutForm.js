import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useFormik } from "formik";
import * as Yup from "yup";

const WorkoutFrom = () => {
  const { dispatch } = useWorkoutsContext();

  const formik = useFormik({
    initialValues: {
      title: "",
      load: "",
      reps: ""
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required."),
      load: Yup.number()
        .typeError("Please enter numbers only.")
        .required("Load is required.")
        .nullable(),
      reps: Yup.number()
        .typeError("Please enter numbers only.")
        .required("Reps is required.")
        .nullable()
    }),
    onSubmit: () => {
      handleSubmit();
    }
  })

  const handleSubmit = async () => {
    const response = await fetch("/api/workouts", {
      method: "POST",
      body: JSON.stringify(formik.values),
      headers: {
        "Content-Type": "application/json"
      }
    });

    const json = await response.json();
    if (!response.ok) {
      console.log("Error: ", json.error);
    } else {
      console.log("new workout added", json);
      dispatch({ type: "CREATE_WORKOUT", payload: json });
    }
    formik.resetForm();
  }

  return (
    <form className="create">
      <h3>Add a New Workout</h3>

      <div>
        <label>Exercise Title:</label>
        <input
          type="text"
          name="title"
          onChange={formik.handleChange}
          onBlur={formik.onBlur}
          value={formik.values.title}
          style={{
            border: formik.touched.title && formik.errors.title ? "1px solid red" : undefined,
          }}
        />
        {(formik.errors.title && formik.touched.title) &&
          <span className="error-text">
            {formik.errors.title}
          </span>
        }
      </div>

      <div>
        <label>Load (kg):</label>
        <input
          type="text"
          name="load"
          onChange={formik.handleChange}
          onBlur={formik.onBlur}
          value={formik.values.load}
          style={{
            border: formik.touched.load && formik.errors.load ? "1px solid red" : undefined,
          }}
        />
        {(formik.errors.load && formik.touched.load) &&
          <span className="error-text">
            {formik.errors.load}
          </span>
        }
      </div>

      <div>
        <label>Reps (kg):</label>
        <input
          type="text"
          name="reps"
          onChange={formik.handleChange}
          onBlur={formik.onBlur}
          value={formik.values.reps}
          style={{
            border: formik.touched.reps && formik.errors.reps ? "1px solid red" : undefined,
          }}
        />
        {(formik.errors.reps && formik.touched.reps) &&
          <span className="error-text">
            {formik.errors.reps}
          </span>
        }
      </div>

      <button
        type="submit"
        onClick={(e) => {
          e.preventDefault();
          formik.handleSubmit()
        }}
      >
        Add Workout
      </button>
    </form>
  );
};

export default WorkoutFrom;