 
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
 
export function CarouselShop() {
  const imgUrls = [
    "https://www.shutterstock.com/image-vector/black-friday-sale-background-monochromatic-260nw-2328470595.jpg",
    "https://img.freepik.com/psd-gratis/plantilla-banner-web-viernes-negro-super-venta_120329-3846.jpg?size=626&ext=jpg",
    "https://trazoweb.co/wp-content/uploads/2022/12/BN015.jpg",
    "https://img.freepik.com/vector-premium/plantilla-banner-productos-electronicos_279069-540.jpg",
    "https://img.freepik.com/vector-gratis/plantilla-pagina-destino-degradado-rebajas-viernes-negro_23-2150872497.jpg",
  ]
  return (
    <Carousel className="lg:w-7/12">
      <CarouselContent>
        {imgUrls.map((e, index) => (
          <CarouselItem key={index}>
            <div>
              <Card>
                <CardContent className="flex p-0 rounded-none">
                  <img  className="h-[400px] w-full" src={e}/>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}