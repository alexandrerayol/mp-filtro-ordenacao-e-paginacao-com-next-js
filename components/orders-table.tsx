'use client'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from './ui/badge';
import { ChevronDown, ChevronUp, ChevronsUpDown } from 'lucide-react';
import { Order } from '@/lib/@types/order';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

interface OrdersTableProps {
  orders: Order[]
}

const formatter = new Intl.NumberFormat('pt-br', {
  style: 'currency',
  currency: 'BRL'
}).format

export default function OrdersTable({orders}:OrdersTableProps) {
  const searchParams = useSearchParams()
  const path = usePathname()
  const { replace } = useRouter()
  const params = new URLSearchParams(searchParams)

  function handleClick(key: string){
    const sort = params.get('sort')

    if(sort === key){
      params.set('sort', `-${key}`)
    } else if(sort === `-${key}`){
      params.delete('sort')
    } else if(sort === null){
      params.set('sort', key)
    } else if(sort){
      params.set('sort', key)
    }

    replace(`${path}?${params.toString()}`)
  }

  function getSortIcon(key: string){
    const sort = params.get('sort')

    if(sort === key){
      return <ChevronDown className='w-4'/>
    } else if(sort === `-${key}`){
      return <ChevronUp className='w-4'/>
    }

    return <ChevronsUpDown className='w-4'/>
  }

  return (
    <Table>
      <TableHeader>
        <TableRow className="w-full">
          <TableHead className="table-cell">Cliente</TableHead>
          <TableHead className="table-cell">Status</TableHead>
          <TableHead className="table-cell cursor-pointer justify-end items-center gap-1" onClick={() => handleClick('order_date')}>
            <div className="flex items-center gap-1">
              Data
              {getSortIcon('order_date')}
            </div>
          </TableHead>
          <TableHead className="text-right cursor-pointer flex justify-end items-center gap-1" onClick={() => handleClick('amount_in_cents')}>
            Valor
            {getSortIcon('amount_in_cents')}
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {
          orders.map( (order) => {
            return (
              <TableRow key={order.id}>
                <TableCell>
                  <div className="font-medium">{order.customer_name}</div>
                  <div className="hidden md:inline text-sm text-muted-foreground">
                  {order.customer_email}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={`text-xs`} variant="outline">
                  { order.status === 'pending' ? 'Pendente' : 'Completo' }
                  </Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">{order.order_date.toString()}</TableCell>
                <TableCell className="text-right">{formatter(order.amount_in_cents / 100)}</TableCell>
              </TableRow>
            )
          })
        }
      </TableBody>
    </Table>
  );
}
