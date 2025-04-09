
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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { products } from "@/data/mock-data";
import { cn } from "@/lib/utils";
import { Clock, Calendar as CalendarIcon, Check, CalendarClock } from "lucide-react";

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
  const [currentStep, setCurrentStep] = useState(1);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      notes: "",
    },
  });

  // Generate available times (9AM to 6PM in 30-min increments)
  const availableTimes = [];
  for (let i = 9; i <= 18; i++) {
    availableTimes.push(`${i}:00`);
    if (i < 18) availableTimes.push(`${i}:30`);
  }

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

  // Check if time slot is available (simulated)
  const isTimeSlotAvailable = (time: string) => {
    // In a real app, this would check against a database of booked slots
    const unavailableTimes = ["11:30", "13:00", "15:30", "17:00"];
    return !unavailableTimes.includes(time);
  };

  const nextStep = () => {
    if (currentStep === 1 && !selectedCombo) {
      toast({
        title: "Selecione um combo",
        description: "É necessário selecionar um combo para continuar.",
        variant: "destructive",
      });
      return;
    }
    
    if (currentStep === 2) {
      const date = form.getValues("date");
      const time = form.getValues("time");
      
      if (!date) {
        toast({
          title: "Selecione uma data",
          description: "É necessário selecionar uma data para continuar.",
          variant: "destructive",
        });
        return;
      }
      
      if (!time) {
        toast({
          title: "Selecione um horário",
          description: "É necessário selecionar um horário para continuar.",
          variant: "destructive",
        });
        return;
      }
    }
    
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
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

  const renderStepIndicator = () => {
    return (
      <div className="flex items-center justify-center mb-8">
        {[1, 2, 3].map((step) => (
          <div key={step} className="flex items-center">
            <div 
              className={`
                flex items-center justify-center w-10 h-10 rounded-full border-2
                ${currentStep === step 
                  ? 'border-primary bg-primary text-primary-foreground' 
                  : currentStep > step
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-gray-200 text-gray-400'
                }
              `}
            >
              {currentStep > step ? <Check className="h-5 w-5" /> : step}
            </div>
            {step < 3 && (
              <div 
                className={`w-16 h-0.5 ${
                  currentStep > step ? 'bg-primary' : 'bg-gray-200'
                }`}
              ></div>
            )}
          </div>
        ))}
      </div>
    );
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
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Agendamento para Grandes Pedidos</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Para pedidos acima de 100 unidades, oferecemos um serviço especial de agendamento.
            Escolha um de nossos combos e programe sua entrega com antecedência.
          </p>
        </div>
        
        {renderStepIndicator()}
        
        <div className="max-w-3xl mx-auto">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              
              {/* Step 1: Choose Combo */}
              {currentStep === 1 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Escolha seu Combo</CardTitle>
                    <CardDescription>
                      Selecione o combo ideal para seu evento
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {combos.map((combo) => (
                        <div
                          key={combo.id}
                          className={cn(
                            "border rounded-lg p-4 cursor-pointer transition-all relative",
                            selectedCombo === combo.id
                              ? "border-primary bg-primary/5"
                              : "hover:border-gray-400"
                          )}
                          onClick={() => {
                            setSelectedCombo(combo.id);
                            form.setValue("combo", combo.id.toString());
                          }}
                        >
                          {selectedCombo === combo.id && (
                            <div className="absolute top-2 right-2 rounded-full bg-primary h-5 w-5 flex items-center justify-center text-primary-foreground">
                              <Check className="h-3 w-3" />
                            </div>
                          )}
                          <div className="font-medium">{combo.name}</div>
                          <div className="text-sm text-gray-500 mb-2">{combo.description}</div>
                          <div className="mt-2 font-bold text-primary">
                            R$ {combo.price.toFixed(2)}
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            {combo.quantity} unidades
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={() => navigate("/combos")}>
                      Ver Todos os Combos
                    </Button>
                    <Button onClick={nextStep}>
                      Continuar
                    </Button>
                  </CardFooter>
                </Card>
              )}
              
              {/* Step 2: Choose Date & Time */}
              {currentStep === 2 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Escolha a Data e Horário</CardTitle>
                    <CardDescription>
                      Selecione quando deseja receber seu pedido
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h3 className="text-sm font-medium flex items-center">
                          <CalendarIcon className="h-4 w-4 mr-1" />
                          Data da Entrega
                        </h3>
                        <FormField
                          control={form.control}
                          name="date"
                          render={({ field }) => (
                            <FormItem className="flex flex-col">
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) => 
                                  date < minDate || 
                                  date > maxDate || 
                                  isWeekend(date)
                                }
                                className="rounded-md border mx-auto"
                              />
                              <FormDescription className="text-center">
                                Entregas disponíveis apenas em dias úteis
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="space-y-4">
                        <h3 className="text-sm font-medium flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          Horário da Entrega
                        </h3>
                        <FormField
                          control={form.control}
                          name="time"
                          render={({ field }) => (
                            <FormItem>
                              <div className="grid grid-cols-3 gap-2">
                                {availableTimes.map((timeSlot) => {
                                  const isAvailable = isTimeSlotAvailable(timeSlot);
                                  return (
                                    <button
                                      key={timeSlot}
                                      type="button"
                                      className={`
                                        p-3 text-sm border rounded-md text-center transition-colors
                                        ${field.value === timeSlot ? 
                                          'bg-primary border-primary text-primary-foreground' : 
                                          isAvailable ? 
                                            'hover:border-primary' : 
                                            'opacity-50 cursor-not-allowed bg-muted'
                                        }
                                      `}
                                      disabled={!isAvailable}
                                      onClick={() => field.onChange(timeSlot)}
                                    >
                                      {timeSlot}
                                    </button>
                                  );
                                })}
                              </div>
                              <FormDescription className="text-center mt-2">
                                Os horários em cinza não estão disponíveis
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={prevStep}>
                      Voltar
                    </Button>
                    <Button onClick={nextStep}>
                      Continuar
                    </Button>
                  </CardFooter>
                </Card>
              )}
              
              {/* Step 3: Customer Information */}
              {currentStep === 3 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Informações do Cliente</CardTitle>
                    <CardDescription>
                      Preencha seus dados para finalizar o agendamento
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Summary */}
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <h3 className="font-medium mb-2 flex items-center">
                        <CalendarClock className="h-4 w-4 mr-2" />
                        Resumo do Agendamento
                      </h3>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="text-muted-foreground">Combo:</div>
                        <div>{combos.find(c => c.id === selectedCombo)?.name}</div>
                        
                        <div className="text-muted-foreground">Quantidade:</div>
                        <div>{combos.find(c => c.id === selectedCombo)?.quantity} unidades</div>
                        
                        <div className="text-muted-foreground">Data:</div>
                        <div>{form.getValues("date")?.toLocaleDateString()}</div>
                        
                        <div className="text-muted-foreground">Horário:</div>
                        <div>{form.getValues("time")}</div>
                        
                        <div className="text-muted-foreground">Valor:</div>
                        <div className="font-medium text-primary">
                          R$ {combos.find(c => c.id === selectedCombo)?.price.toFixed(2)}
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    {/* Contact Information */}
                    <div className="space-y-4">
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
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button type="button" variant="outline" onClick={prevStep}>
                      Voltar
                    </Button>
                    <Button type="submit">
                      Confirmar Agendamento
                    </Button>
                  </CardFooter>
                </Card>
              )}
            </form>
          </Form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SchedulePage;
