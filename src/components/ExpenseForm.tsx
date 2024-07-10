import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import categories from "./components";

const schema = z.object({
  description: z
    .string()
    .min(3, { message: "Description must be at least three caracters." }),
  quantity: z.number().min(1, { message: "Quantity can't be less than 1" }),
  cost: z
    .number()
    .min(0.01, { message: `Item can't cost less than 1 cent` })
    .max(100_000, { message: `Item can't cost more than $100,000` }),
  category: z.string({ invalid_type_error: "Please select a category" }),
});
console.log(schema);

type ExpenseFormData = z.infer<typeof schema>;

interface Props {
  onSubmit: (data: ExpenseFormData) => void;
}

const ExpenseForm = ({ onSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<ExpenseFormData>({ resolver: zodResolver(schema) });

  return (
    <>
      <form
        className="mb-3"
        onSubmit={handleSubmit((data) => {
          console.log(data);
          onSubmit(data);
          reset();
        })}
      >
        <div className="mb-3">
          <label className="form-label" htmlFor="description">
            Description
          </label>
          <input
            {...register("description")}
            id="description"
            className="form-control"
            type="text"
          />
          {errors.description && (
            <p className="text-danger">{errors.description.message}</p>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="quantity" className="form-label">
            Quantity
          </label>
          <input
            {...register("quantity", { valueAsNumber: true })}
            id="quantity"
            type="number"
            className="form-control"
          />
          {errors.quantity && (
            <p className="text-danger">{errors.quantity.message}</p>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="cost" className="form-label">
            Cost
          </label>
          <input
            {...register("cost", { valueAsNumber: true })}
            id="cost"
            type="number"
            className="form-control"
          />
          {errors.cost && <p className="text-danger">{errors.cost.message}</p>}
        </div>
        <div className="mb-3">
          <label htmlFor="category" className="form-label">
            Category
          </label>
          <select
            {...register("category")}
            id="category"
            className="form-select pb-3"
            name="category"
          >
            <option value=""></option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <button disabled={!isValid} className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
};

export default ExpenseForm;
