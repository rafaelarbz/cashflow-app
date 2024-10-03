import pdfMake from "pdfmake/build/pdfmake"
import pdfFonts from "pdfmake/build/vfs_fonts"

pdfMake.vfs = pdfFonts.pdfMake.vfs

export interface TableData {
  headers: string[]
  values: (string | number)[][]
}
  
export interface ListItem {
  label: string
  children?: ListItem[]
}

export interface ListData {
  header: string
  items: ListItem[]
}

interface PdfProps {
  title: string
  table?: TableData
  list?: ListData
}

export const createPdf = ({title, table, list}: PdfProps) => {
  const renderList = (items: ListItem[], level: number = 0): any[] => {
    return items.flatMap(item => [
      { text: item.label, margin: [0, 0, 0, 5],
        marginLeft: level * 20
      },
      ...(item.children?.length ? renderList(item.children!, level + 1) : [])
    ])
  }

  const docDefinition: any = {
    content: [
      { text: title, style: 'header' },
      {
        style: 'table',
        table: {
          headerRows: 1,
          widths: Array(table.headers.length).fill('*'),
          body: [
            table.headers,
            ...table.values,
          ],
        },
      },
      ...(list
        ? [
          { text: list.header, style: 'subheader', margin: [0, 20, 0, 10] },
          ...renderList(list.items),
        ]
        : []),
    ],
    styles: {
      header: {
        fontSize: 22,
        bold: true,
        margin: [0, 0, 0, 10],
      },
      subheader: {
        fontSize: 18,
        bold: true,
        margin: [0, 10, 0, 5],
      },
      table: {
        margin: [0, 5, 0, 15],
      },
    },
  }
  
  pdfMake.createPdf(docDefinition).download(`${title}.pdf`)
}