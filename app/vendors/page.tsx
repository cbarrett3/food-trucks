import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export const metadata: Metadata = {
  title: "for vendors | food truckies",
  description: "join our platform and grow your food truck business",
}

export default function VendorsPage() {
  return (
    <main className="flex-1 flex flex-col">
      <section className="py-12 md:py-20 bg-gradient-to-b from-background to-muted">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  grow your food truck business with us
                </h1>
                <p className="text-muted-foreground md:text-xl">
                  join thousands of food truck owners who use our platform to reach new customers and grow their business.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button 
                  size="lg" 
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  get started
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                >
                  learn more
                </Button>
              </div>
            </div>
            <div className="mx-auto lg:mx-0 relative aspect-video overflow-hidden rounded-xl">
              <Image
                src="/placeholder.svg"
                alt=""
                fill
                className="object-cover"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20">
        <div className="container px-4 md:px-6">
          <div className="text-center space-y-3 mb-12">
            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">
              why join food truckies?
            </h2>
            <p className="text-muted-foreground md:text-lg mx-auto max-w-[700px]">
              our platform offers everything you need to succeed in the competitive food truck industry
            </p>
          </div>
          
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "reach more customers",
                description: "get discovered by thousands of hungry customers looking for unique food experiences",
                icon: "👥"
              },
              {
                title: "easy scheduling",
                description: "update your location and hours in real-time so customers always know where to find you",
                icon: "📅"
              },
              {
                title: "boost your brand",
                description: "create a beautiful profile that showcases your menu, photos, and customer reviews",
                icon: "✨"
              },
              {
                title: "insights & analytics",
                description: "access valuable data about your customers and performance to optimize your business",
                icon: "📊"
              },
              {
                title: "simple payments",
                description: "accept online orders and payments with our integrated payment processing",
                icon: "💳"
              },
              {
                title: "marketing tools",
                description: "promote special offers and events to attract new customers and keep regulars coming back",
                icon: "📣"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center text-center p-6 bg-background rounded-xl border border-border shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-2xl">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="grid grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="aspect-square relative rounded-lg overflow-hidden">
                    <Image
                      src={`/placeholder.svg?text=Vendor+${i}`}
                      alt=""
                      fill
                      className="object-cover"
                      aria-hidden="true"
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4 order-1 lg:order-2">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter">
                  join our community of successful vendors
                </h2>
                <p className="text-muted-foreground">
                  hear from food truck owners who have grown their business with our platform
                </p>
              </div>
              <blockquote className="border-l-4 border-primary pl-4 italic">
                "since joining food truckies, we've seen a 40% increase in customers and our revenue has doubled. the platform makes it easy to connect with food lovers in our area."
                <footer className="text-sm font-medium mt-2">— sarah, taco revolution</footer>
              </blockquote>
              <div className="pt-4">
                <Button 
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  apply to join
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20">
        <div className="container px-4 md:px-6">
          <div className="max-w-md mx-auto text-center space-y-6">
            <h2 className="text-2xl font-bold">ready to grow your business?</h2>
            <p className="text-muted-foreground">
              join food truckies today and start connecting with hungry customers in your area
            </p>
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground w-full sm:w-auto"
            >
              get started now
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
