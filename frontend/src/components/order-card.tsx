import { Order } from '@/pages/app/orders'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card'
import { format } from 'date-fns'
import { Badge } from './ui/badge'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion'
import { ScrollArea } from './ui/scroll-area'
import { Separator } from './ui/separator'
import { formatMoney } from '@/utils/format-money'

export function OrderCard({ order }: { order: Order }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Pedido #{order.orderId}</CardTitle>
            <CardDescription>
              Feito dia: {format(new Date(order.createdAt), 'MMMM d, yyyy')}
            </CardDescription>
          </div>
          <Badge variant="outline">{formatMoney(order.total)}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value={`order-${order.orderId}`}>
            <AccordionTrigger>Ver detalhes</AccordionTrigger>
            <AccordionContent>
              <ScrollArea className="h-[300px] w-full rounded-md border">
                <div className="p-4">
                  {order.items.map((item, index) => (
                    <div key={item.orderItemId}>
                      {index > 0 && <Separator className="my-4" />}
                      <div className="flex space-x-4">
                        <img
                          src={item.productImages[0]}
                          alt={item.productName}
                          className="rounded-md w-48 h-48 object-cover"
                        />
                        <div className="flex-grow">
                          <h4 className="font-semibold">{item.productName}</h4>
                          <p className="text-sm text-muted-foreground">
                            {item.productDescription}
                          </p>
                          <div className="flex justify-between items-center mt-2">
                            <p className="text-sm font-semibold">
                              ${item.productPrice.toFixed(2)}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Quantity: {item.quantity}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  )
}
