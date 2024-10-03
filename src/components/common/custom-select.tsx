import { 
    Select, 
    SelectTrigger, 
    SelectValue,
    SelectContent, 
    SelectItem 
} from '@/components/ui/select'
import { useTranslations } from '@/translations/translations'
import { Control, FieldValues } from 'react-hook-form'
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

interface CustomSelectProps {
    control: Control<FieldValues>,
    name: string,
    label: string,
    options: IOption[]
}

export function CustomSelect ({
    control,
    name,
    label,
    options
}: CustomSelectProps ) {
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