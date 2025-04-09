
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Calendar } from "@/components/ui/calendar";
import { toast } from "@/components/ui/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { products } from "@/data/mock-data";
import { cn } from "@/lib/utils";

// Define combos for bulk orders
const combos = [
  {
    id: 1,
    name: "Festa Pequena",
    description: "100 salgados sortidos",
    price: 149.9,
    quantity: 100,
  },
  {
    id: 2,
    name: "Festa Média",
    description: "200 salgados sortidos",
    price: 279.9,
    quantity: 200,
  },
  {
    id: 3,
    name: "Festa Grande",
    description: "300 salgados sortidos",
    price: 399.9,
    quantity: 300,
  },
  {
    id: 4,
    name: "Evento Corporativo",
    description: "500 salgados premium",
    price: 699.9,
    quantity: 500,
  },
];

const formSchema = z.object({
  combo: z.string({
    required_error: "Por favor selecione um combo",
  }),
  date: z.date({
    required_error: "Por favor selecione uma data para entrega",
  }),
  time: z.string({
    required_error: "Por favor selecione um horário para entrega",
  }),
  name: z.string().min(3, {
    message: "Nome deve ter pelo menos 3 caracteres",
  }),
  phone: z.string().min(10, {
    message: "Telefone inválido",
  }),
  address: z.string().min(5, {
    message: "Endereço deve ter pelo menos 5 caracteres",
  }),
  notes: z.string().optional(),
});

const SchedulePage = () => {
  const navigate = useNavigate();
  const [selectedCombo, setSelectedCombo] = useState<number | null>(null);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      notes: "",
    },
  });

  // Generate available times (9AM to 6PM in 1-hour increments)
  const availableTimes = Array.from({ length: 10 }, (_, i) => {
    const hour = i + 9;
    return `${hour}:00`;
  });

  // Calculate the minimum date (next day)
  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 1);

  // Calculate the maximum date (30 days from now)
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 30);

  // Disable weekends
  const isWeekend = (date: Date) => {
    const day = date.getDay();
    return day === 0 || day === 6;
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    toast({
      title: "Agendamento confirmado!",
      description: `Seu pedido foi agendado para ${values.date.toLocaleDateString()} às ${values.time}`,
    });
    
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-4">
          <Button variant="ghost" onClick={() => navigate(-1)} className="text-gray-500">
            ← Voltar
          </Button>
        </div>
        
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-4">Agendamento para Grandes Pedidos</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Para pedidos acima de 100 unidades, oferecemos um serviço especial de agendamento.
            Escolha um de nossos combos e programe sua entrega com antecedência.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Combo selection */}
          <div className="lg:col-span-1">
            <div className="sticky top-4">
              <Card>
                <CardHeader>
                  <CardTitle>Escolha seu Combo</CardTitle>
                  <CardDescription>
                    Combos especiais para eventos
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {combos.map((combo) => (
                    <div
                      key={combo.id}
                      className={cn(
                        "border rounded-lg p-4 cursor-pointer transition-all",
                        selectedCombo === combo.id
                          ? "border-primary bg-primary/5"
                          : "hover:border-gray-400"
                      )}
                      onClick={() => {
                        setSelectedCombo(combo.id);
                        form.setValue("combo", combo.id.toString());
                      }}
                    >
                      <div className="font-medium">{combo.name}</div>
                      <div className="text-sm text-gray-500">{combo.description}</div>
                      <div className="mt-2 font-bold text-primary">
                        R$ {combo.price.toFixed(2)}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Scheduling form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Agende sua Entrega</CardTitle>
                <CardDescription>
                  Preencha os dados abaixo para agendar sua entrega
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="date"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Data de Entrega</FormLabel>
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => 
                              date < minDate || 
                              date > maxDate || 
                              isWeekend(date)
                            }
                            className="rounded-md border pointer-events-auto"
                          />
                          <FormDescription>
                            Entregas disponíveis apenas em dias úteis
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="time"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Horário de Entrega</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione um horário" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {availableTimes.map((time) => (
                                <SelectItem key={time} value={time}>
                                  {time}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            Horários disponíveis entre 9h e 18h
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Separator />
                    
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nome Completo</FormLabel>
                          <FormControl>
                            <input
                              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                              placeholder="Seu nome completo"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Telefone</FormLabel>
                          <FormControl>
                            <input
                              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                              placeholder="(00) 00000-0000"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Telefone para contato no dia da entrega
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Endereço de Entrega</FormLabel>
                          <FormControl>
                            <textarea
                              className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                              placeholder="Rua, número, complemento, bairro, cidade, CEP"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="notes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Observações (opcional)</FormLabel>
                          <FormControl>
                            <textarea
                              className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                              placeholder="Instruções especiais para entrega..."
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Informações adicionais para o entregador
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit" 
                      className="w-full"
                      disabled={!selectedCombo}
                    >
                      Confirmar Agendamento
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SchedulePage;
