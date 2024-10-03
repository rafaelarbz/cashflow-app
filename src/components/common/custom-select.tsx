import { 
    Select, 
    SelectTrigger, 
    SelectValue,
    SelectContent, 
    SelectItem 
} from '@/components/ui/select'
import { useTranslations } from '@/translations/translations'
import { Control, FieldValues, Path } from 'react-hook-form'
import { 
    FormControl, 
    FormField, 
    FormItem, 
    FormLabel, 
    FormMessage 
} from '@/components/ui/form'

export interface IOption {
    label: string,
    value: string
}

interface CustomSelectProps<T extends FieldValues> {
    control: Control<T>,
    name: Path<T>,
    label: string,
    options: IOption[]
}

export function CustomSelect<T extends FieldValues> ({
    control,
    name,
    label,
    options
}: CustomSelectProps<T> ) {
    const translations = useTranslations()

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>
                        {label}
                    </FormLabel>
                    <FormControl>
                        <Select defaultValue={field.value} onValueChange={field.onChange}>
                            <SelectTrigger>
                                <SelectValue placeholder={translations.common.select} />
                            </SelectTrigger>
                            <SelectContent>
                                {options.map((option, index) => (
                                    <SelectItem key={index} value={option.value}>
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}