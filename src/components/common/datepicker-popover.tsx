import { 
    Popover, 
    PopoverContent, 
    PopoverTrigger 
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { 
    FormControl, 
    FormField, 
    FormItem, 
    FormLabel, 
    FormMessage 
} from '@/components/ui/form'
import { formatDate } from '@/utils/formatter'
import { useTranslations } from '@/translations/translations'
import { CalendarIcon } from 'lucide-react'
import { Calendar } from '@/components/ui/calendar'
import { Control, FieldValues, Path } from 'react-hook-form'

interface DatePickerPopoverProps<T extends FieldValues> {
    control: Control<T>,
    name: Path<T>,
    label: string
}

export function DatePickerPopover<T extends FieldValues> ({ 
    control, 
    name, 
    label 
}: DatePickerPopoverProps<T>) {
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
                    <Popover>
                        <PopoverTrigger asChild>
                            <FormControl>
                                <Button
                                    variant="outline"
                                    className="w-full"
                                >
                                    {field.value ? (
                                        formatDate(new Date(field.value))
                                    ) : (
                                        <span>
                                            {translations.common.select}
                                        </span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                            </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar 
                            className="flex justify-center"
                                mode="single" 
                                selected={field.value} 
                                onSelect={(date) => {
                                    field.onChange(date ? date.toISOString() : null)
                                }}
                            />
                        </PopoverContent>
                    </Popover>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}