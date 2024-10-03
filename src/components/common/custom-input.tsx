import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Control, FieldValues, useFormContext } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { ChangeEvent } from "react"
import { applyMask, MaskName } from "@/utils/mask.util"

interface CustomInputProps {
    control: Control<FieldValues>,
    type: string,
    name: string,
    label: string,
    maskName?: MaskName,
    placeholder?: string,
    disabled?: boolean
}

export function CustomInput({ 
    control, 
    type,
    name, 
    label, 
    maskName, 
    placeholder,
    disabled = false
}: CustomInputProps) {
    const { setValue } = useFormContext()

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        let finalValue;

        if (type === 'number')
            finalValue = Number(value)
        else
            finalValue = applyMask(maskName, value)

        setValue(name, finalValue);
    }

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>
                        {label}
                    </FormLabel>
                    <FormControl onChange={ (e: ChangeEvent<HTMLInputElement>) => handleChange(e)}>
                        <Input
                            {...field}
                            id={name}
                            placeholder={placeholder}
                            type={type}
                            autoComplete="off"
                            disabled={disabled}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}