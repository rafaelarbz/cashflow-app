import { useTranslation } from 'react-i18next'

export const useTranslations = () => {
  const { t } = useTranslation();

  return {
    common: {
      save: t('common.save'),
      cancel: t('common.cancel'),
      edit: t('common.edit'),
      delete: t('common.delete'),
      confirm: t('common.confirm'),
      back: t('common.back'),
      add: t('common.add'),
      update: t('common.update'),
      next: t('common.next'),
      previous: t('common.previous'),
      yes: t('common.yes'),
      no: t('common.no'),
      close: t('common.close'),
      loading: t('common.loading'),
      notFound: t('common.notFound'),
      options: t('common.options'),
      actions: t('common.actions'),
      noResults: t('common.noResults'),
      clearAll: t('common.clearAll'),
      select: t('common.select'),
      attention: t('common.attention'),
      items: t('common.items')
    },
    navigation: {
      home: t('navigation.home'),
      transactions: t('navigation.transactions'),
      registerTransactions: t('navigation.registerTransactions'),
      reports: t('navigation.reports'),
      settings: t('navigation.settings'),
      profile: t('navigation.profile'),
      logout: t('navigation.logout'),
    },
    transactions: {
      title: t('transactions.title'),
      singleTitle: t('transactions.singleTitle'),
      list: t('transactions.list'),
      addNew: t('transactions.addNew'),
      income: t('transactions.income'),
      expense: t('transactions.expense'),
      amount: t('transactions.amount'),
      date: t('transactions.date'),
      description: t('transactions.description'),
      type: t('transactions.type'),
      quantity: t('transactions.quantity'),
      zeroed: t('transactions.zeroed'),
      paymentMethod: t('transactions.paymentMethod'),
      noTransactions: t('transactions.noTransactions'),
      repeat: t('transactions.repeat'),
      repeatField: t('transactions.repeatField'),
      totals: {
        title: t('transactions.totals.title'),
        income: t('transactions.totals.income'),
        expense: t('transactions.totals.expense'),
        balance: t('transactions.totals.balance')
      }
    },
    income: {
      title: t('income.title'),
      add: t('income.add'),
      edit: t('income.edit'),
      amount: t('income.amount'),
      date: t('income.date'),
      description: t('income.description'),
      category: t('income.category'),
      paymentMethod: t('income.paymentMethod'),
    },
    expense: {
      title: t('expense.title'),
      add: t('expense.add'),
      edit: t('expense.edit'),
      amount: t('expense.amount'),
      date: t('expense.date'),
      description: t('expense.description'),
      category: t('expense.category'),
      paymentMethod: t('expense.paymentMethod'),
    },
    reports: {
      title: t('reports.title'),
      exportPdf: t('reports.exportPdf'),
      incomeVsExpense: t('reports.incomeVsExpense'),
      monthlyReport: t('reports.monthlyReport'),
      categoryReport: t('reports.categoryReport'),
    },
    settings: {
      title: t('settings.title'),
      language: t('settings.language'),
      currency: t('settings.currency'),
      profile: t('settings.profile'),
      security: t('settings.security'),
      dateFormat: t('settings.dateFormat'),
      currencyFormat: t('settings.currencyFormat'),
    },
    paymentMethods: {
      cash: t('paymentMethods.cash'),
      creditCard: t('paymentMethods.creditCard'),
      debitCard: t('paymentMethods.debitCard'),
      bankTransfer: t('paymentMethods.bankTransfer'),
      paypal: t('paymentMethods.paypal'),
    },
    feedback: {
      operationSuccess: t('feedback.operationSuccess'),
      operationFailed: t('feedback.operationFailed'),
      validationError: t('feedback.validationError'),
      error: t('feedback.error'),
      success: t('feedback.success'),
      noTransactions: t('feedback.noTransactions')
    },
    development: {
      comingSoon: t('development.comingSoon'),
      inDevelopment: t('development.inDevelopment'),
      workingOnIt: t('development.workingOnIt'),
    },
    formats: {
      date: t('formats.date'),
      currency: t('formats.currency'),
      currencyPlaceholder: t('formats.currencyPlaceholder')
    },
    theme: {
      title: t('theme.title'),
      toggle: t('theme.toggle'),
      dark: t('theme.dark'),
      light: t('theme.light'),
      system: t('theme.system'),
    },
    language: {
      title: t('language.title'),
      toggle: t('language.toggle'),
    },
    fields: {
      required: t('fields.required'),
      size: {
        min: t('fields.size.min'),
        max: t('fields.size.max')
      },
      invalid: t('fields.invalid'),
      invalidEnum: t('fields.invalidEnum'),
      amountMustBePositive: t('fields.amountMustBePositive')
    }
  };
}