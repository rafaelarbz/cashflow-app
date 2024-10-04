import jsPDF from "jspdf"
import autoTable, { jsPDFDocument, RowInput } from "jspdf-autotable"

export interface TableHeader {
  text: string
  colSpan?: number
  rowSpan?: number
}

export interface TableConfig<T> {
  headers: TableHeader[]
  data: T[]
  styles?: unknown
}

export const createPdf = async(options: {
  title: string
  tables: TableConfig<RowInput>[]
}) => {
  const doc = new jsPDF()

  doc.setFontSize(22)
  doc.text(options.title, 14, 20)

  let startY = 35

  options.tables.forEach((tableConfig, index) => {
    const { headers, data, styles } = tableConfig

    const formattedHeaders = headers.map(header => [header.text])

    const automaticColumnStyles = Object.keys(headers).reduce((styles, headerIndex) => {
      return {
        ...styles,
        [headerIndex]: { columnWidth: "auto" },
      }
    }, {})

    autoTable(doc, {
      head: [formattedHeaders],
      body: data,
      startY: startY,
      margin: { horizontal: 14 },
      styles: styles || {},
      columnStyles: index === 0 ? automaticColumnStyles : undefined
    })

    startY = (doc as jsPDFDocument).lastAutoTable.finalY + 10
  })

  doc.save(`document.pdf`)
}