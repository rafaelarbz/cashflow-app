import { formatCurrency, formatCpfCnpj } from "./formatter"

export enum MaskName {
  CURRENCY = 'currency',
  CPF_CNPJ = 'cpfCpnj'
}

const maskFunctions = {
  [MaskName.CURRENCY]: applyCurrencyMask,
  [MaskName.CPF_CNPJ]: applyCpfCnpjMask,
}

export function applyMask(
  maskName: MaskName | undefined, 
  value: string): string {
    if (maskName && maskFunctions[maskName]) {
      return maskFunctions[maskName](value)
    }

    return value
}

function applyCurrencyMask(value: string): string {
  let cleanValue = value.replace(/[^0-9]/g, "")
  cleanValue = cleanValue.slice(0, 13)
  return formatCurrency(cleanValue)
}

function applyCpfCnpjMask(value: string): string {
  let cleanValue = value.replace(/[^0-9]/g, "")
  cleanValue = cleanValue.slice(0, 14)
  return formatCpfCnpj(cleanValue)
}