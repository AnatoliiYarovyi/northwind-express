export interface CtrlCustomersIntr {
    status: 'success' | 'error',
    data: {
      duration: number,
      ts: string,
      servedBy: 'northwind.db',
      sqlString: string,
      data: BolhoeVlojenie,
    },
}

interface BolhoeVlojenie {

}