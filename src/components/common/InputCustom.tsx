import { Controller } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";

type IInputCustom = {
  name: string;
  control: any;
  label?: string;
  placeholder?: string;
  error?: any;
  className?: {
    field?: string,
    label?: string,
    input?: string,
    error?: string
  };
  [key: string]: any
};

export default function InputCustom({
  name,
  control,
  label,
  placeholder,
  error,
  className,
  type,
  ...props
}: IInputCustom) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState, formState }) => {
        return (
          <Field data-invalid={fieldState.invalid} className={cn('gap-2',className?.field)}>
            {label && (
              <FieldLabel htmlFor={`label-for-${name}`} className={cn('text-[13px] text-stone-900 font-normal ', className?.label)}>{label}</FieldLabel>
            )}
            <Input
              {...field}
              className={className?.input}
              type={type}
              id={`input-for-${name}`}
              aria-invalid={fieldState.invalid}
              placeholder={placeholder}
              autoComplete="off"
              {...props}
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} className={className?.error} />}
          </Field>
        );
      }}
    />
  );
}
