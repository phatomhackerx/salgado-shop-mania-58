
import { useState } from "react";
import { 
  Settings, 
  Save, 
  User, 
  Store, 
  CreditCard, 
  Bell, 
  Lock, 
  Mail,
  Brush,
  Palette,
  Moon,
  Sun,
  Globe,
  Upload,
  HelpCircle
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const ConfiguracoesPage = () => {
  // Form state for the various settings
  const [storeSettings, setStoreSettings] = useState({
    name: "Salgado Express",
    email: "contato@salgadoexpress.com",
    phone: "(11) 98765-4321",
    address: "Av. Paulista, 1000 - São Paulo, SP",
    openingHours: "Segunda a Sábado: 08:00 - 20:00",
    logo: "/placeholder.svg"
  });
  
  const [userSettings, setUserSettings] = useState({
    name: "Administrador",
    email: "admin@salgadoexpress.com",
    role: "Administrador"
  });
  
  const [notificationSettings, setNotificationSettings] = useState({
    orderNotifications: true,
    marketingEmails: false,
    systemUpdates: true,
    scheduleAlerts: true
  });
  
  const [appearanceSettings, setAppearanceSettings] = useState({
    theme: "light",
    accentColor: "default",
    fontSize: "medium",
    language: "pt-BR"
  });
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Configurações</h2>
      </div>
      
      <Tabs defaultValue="store" className="space-y-6">
        <TabsList className="grid grid-cols-1 md:grid-cols-5 gap-2">
          <TabsTrigger value="store" className="flex items-center">
            <Store className="mr-2 h-4 w-4" />
            Loja
          </TabsTrigger>
          <TabsTrigger value="account" className="flex items-center">
            <User className="mr-2 h-4 w-4" />
            Conta
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center">
            <Bell className="mr-2 h-4 w-4" />
            Notificações
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex items-center">
            <Brush className="mr-2 h-4 w-4" />
            Aparência
          </TabsTrigger>
          <TabsTrigger value="payment" className="flex items-center">
            <CreditCard className="mr-2 h-4 w-4" />
            Pagamento
          </TabsTrigger>
        </TabsList>
        
        {/* Store Settings */}
        <TabsContent value="store" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Informações da Loja</CardTitle>
              <CardDescription>
                Gerencie as informações básicas da sua loja exibidas aos clientes.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="store-name">Nome da Loja</Label>
                <Input
                  id="store-name"
                  value={storeSettings.name}
                  onChange={(e) => setStoreSettings({...storeSettings, name: e.target.value})}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="store-email">Email</Label>
                  <Input
                    id="store-email"
                    type="email"
                    value={storeSettings.email}
                    onChange={(e) => setStoreSettings({...storeSettings, email: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="store-phone">Telefone</Label>
                  <Input
                    id="store-phone"
                    value={storeSettings.phone}
                    onChange={(e) => setStoreSettings({...storeSettings, phone: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="store-address">Endereço</Label>
                <Input
                  id="store-address"
                  value={storeSettings.address}
                  onChange={(e) => setStoreSettings({...storeSettings, address: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="store-hours">Horário de Funcionamento</Label>
                <Input
                  id="store-hours"
                  value={storeSettings.openingHours}
                  onChange={(e) => setStoreSettings({...storeSettings, openingHours: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="store-logo">Logo da Loja</Label>
                <div className="flex items-center gap-4">
                  <img 
                    src={storeSettings.logo} 
                    alt="Logo da loja" 
                    className="h-16 w-16 rounded-md border object-contain p-1"
                  />
                  <Button variant="outline" className="flex items-center gap-2">
                    <Upload className="h-4 w-4" />
                    Carregar Logo
                  </Button>
                </div>
              </div>
              
              <div className="flex justify-end pt-4">
                <Button className="flex items-center gap-2">
                  <Save className="h-4 w-4" />
                  Salvar Alterações
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>SEO e Redes Sociais</CardTitle>
              <CardDescription>
                Configure as informações SEO e de redes sociais da sua loja.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="store-description">Descrição da Loja</Label>
                <Textarea
                  id="store-description"
                  placeholder="Descreva sua loja em poucas palavras..."
                  className="min-h-[100px]"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="store-keywords">Palavras-chave</Label>
                <Input
                  id="store-keywords"
                  placeholder="salgados, festa, delivery, coxinha, empada..."
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="instagram">Instagram</Label>
                  <Input
                    id="instagram"
                    placeholder="@seuinstagram"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="facebook">Facebook</Label>
                  <Input
                    id="facebook"
                    placeholder="facebook.com/suapagina"
                  />
                </div>
              </div>
              
              <div className="flex justify-end pt-4">
                <Button className="flex items-center gap-2">
                  <Save className="h-4 w-4" />
                  Salvar Alterações
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Account Settings */}
        <TabsContent value="account" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Seu Perfil</CardTitle>
              <CardDescription>
                Gerencie suas informações pessoais e preferências.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="account-name">Nome</Label>
                <Input
                  id="account-name"
                  value={userSettings.name}
                  onChange={(e) => setUserSettings({...userSettings, name: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="account-email">Email</Label>
                <Input
                  id="account-email"
                  type="email"
                  value={userSettings.email}
                  onChange={(e) => setUserSettings({...userSettings, email: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="account-role">Função</Label>
                <Input
                  id="account-role"
                  value={userSettings.role}
                  disabled
                />
              </div>
              
              <div className="flex justify-end pt-4">
                <Button className="flex items-center gap-2">
                  <Save className="h-4 w-4" />
                  Salvar Alterações
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Segurança</CardTitle>
              <CardDescription>
                Gerencie sua senha e configurações de segurança.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Senha Atual</Label>
                <Input
                  id="current-password"
                  type="password"
                  placeholder="••••••••"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="new-password">Nova Senha</Label>
                  <Input
                    id="new-password"
                    type="password"
                    placeholder="••••••••"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirmar Nova Senha</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    placeholder="••••••••"
                  />
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-4">
                <div className="flex items-center space-x-2">
                  <Switch id="two-factor" />
                  <Label htmlFor="two-factor">Ativar autenticação de dois fatores</Label>
                </div>
              </div>
              
              <div className="flex justify-end pt-4">
                <Button className="flex items-center gap-2">
                  <Save className="h-4 w-4" />
                  Atualizar Senha
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Notification Settings */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Preferências de Notificação</CardTitle>
              <CardDescription>
                Escolha quais notificações você deseja receber.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="order-notifications">Notificações de Pedidos</Label>
                  <p className="text-sm text-gray-500">
                    Receba alertas quando novos pedidos forem feitos.
                  </p>
                </div>
                <Switch
                  id="order-notifications"
                  checked={notificationSettings.orderNotifications}
                  onCheckedChange={(checked) => 
                    setNotificationSettings({...notificationSettings, orderNotifications: checked})
                  }
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="marketing-emails">Emails de Marketing</Label>
                  <p className="text-sm text-gray-500">
                    Receba informações sobre promoções e novidades.
                  </p>
                </div>
                <Switch
                  id="marketing-emails"
                  checked={notificationSettings.marketingEmails}
                  onCheckedChange={(checked) => 
                    setNotificationSettings({...notificationSettings, marketingEmails: checked})
                  }
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="system-updates">Atualizações do Sistema</Label>
                  <p className="text-sm text-gray-500">
                    Seja notificado sobre novas funcionalidades e atualizações.
                  </p>
                </div>
                <Switch
                  id="system-updates"
                  checked={notificationSettings.systemUpdates}
                  onCheckedChange={(checked) => 
                    setNotificationSettings({...notificationSettings, systemUpdates: checked})
                  }
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="schedule-alerts">Alertas de Agendamento</Label>
                  <p className="text-sm text-gray-500">
                    Receba lembretes sobre entregas e eventos agendados.
                  </p>
                </div>
                <Switch
                  id="schedule-alerts"
                  checked={notificationSettings.scheduleAlerts}
                  onCheckedChange={(checked) => 
                    setNotificationSettings({...notificationSettings, scheduleAlerts: checked})
                  }
                />
              </div>
              
              <div className="flex justify-end pt-4">
                <Button className="flex items-center gap-2">
                  <Save className="h-4 w-4" />
                  Salvar Preferências
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Appearance Settings */}
        <TabsContent value="appearance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Tema e Layout</CardTitle>
              <CardDescription>
                Personalize a aparência do painel administrativo.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Tema</Label>
                <RadioGroup 
                  defaultValue={appearanceSettings.theme}
                  className="flex flex-col space-y-1"
                  onValueChange={(value) => 
                    setAppearanceSettings({...appearanceSettings, theme: value})
                  }
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="light" id="theme-light" />
                    <Label htmlFor="theme-light" className="flex items-center">
                      <Sun className="mr-2 h-4 w-4" />
                      Claro
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="dark" id="theme-dark" />
                    <Label htmlFor="theme-dark" className="flex items-center">
                      <Moon className="mr-2 h-4 w-4" />
                      Escuro
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="system" id="theme-system" />
                    <Label htmlFor="theme-system" className="flex items-center">
                      <Settings className="mr-2 h-4 w-4" />
                      Sistema
                    </Label>
                  </div>
                </RadioGroup>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <Label htmlFor="accent-color">Cor de Destaque</Label>
                <Select 
                  defaultValue={appearanceSettings.accentColor}
                  onValueChange={(value) => 
                    setAppearanceSettings({...appearanceSettings, accentColor: value})
                  }
                >
                  <SelectTrigger id="accent-color">
                    <SelectValue placeholder="Selecione uma cor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Padrão (Roxo)</SelectItem>
                    <SelectItem value="blue">Azul</SelectItem>
                    <SelectItem value="green">Verde</SelectItem>
                    <SelectItem value="amber">Âmbar</SelectItem>
                    <SelectItem value="red">Vermelho</SelectItem>
                    <SelectItem value="pink">Rosa</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <Label htmlFor="font-size">Tamanho da Fonte</Label>
                <Select 
                  defaultValue={appearanceSettings.fontSize}
                  onValueChange={(value) => 
                    setAppearanceSettings({...appearanceSettings, fontSize: value})
                  }
                >
                  <SelectTrigger id="font-size">
                    <SelectValue placeholder="Selecione um tamanho" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">Pequeno</SelectItem>
                    <SelectItem value="medium">Médio</SelectItem>
                    <SelectItem value="large">Grande</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <Label htmlFor="language">Idioma</Label>
                <Select 
                  defaultValue={appearanceSettings.language}
                  onValueChange={(value) => 
                    setAppearanceSettings({...appearanceSettings, language: value})
                  }
                >
                  <SelectTrigger id="language" className="flex items-center">
                    <Globe className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Selecione um idioma" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pt-BR">Português (Brasil)</SelectItem>
                    <SelectItem value="en-US">English (US)</SelectItem>
                    <SelectItem value="es-ES">Español</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex justify-end pt-4">
                <Button className="flex items-center gap-2">
                  <Save className="h-4 w-4" />
                  Salvar Preferências
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Payment Settings */}
        <TabsContent value="payment" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Métodos de Pagamento</CardTitle>
              <CardDescription>
                Configure as opções de pagamento disponíveis para seus clientes.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="credit-card">Cartão de Crédito</Label>
                  <p className="text-sm text-gray-500">
                    Aceitar pagamentos com cartão de crédito.
                  </p>
                </div>
                <Switch id="credit-card" defaultChecked />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="debit-card">Cartão de Débito</Label>
                  <p className="text-sm text-gray-500">
                    Aceitar pagamentos com cartão de débito.
                  </p>
                </div>
                <Switch id="debit-card" defaultChecked />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="pix">PIX</Label>
                  <p className="text-sm text-gray-500">
                    Aceitar pagamentos via PIX.
                  </p>
                </div>
                <Switch id="pix" defaultChecked />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="cash">Dinheiro</Label>
                  <p className="text-sm text-gray-500">
                    Aceitar pagamentos em dinheiro na entrega.
                  </p>
                </div>
                <Switch id="cash" defaultChecked />
              </div>
              
              <div className="flex justify-end pt-4">
                <Button className="flex items-center gap-2">
                  <Save className="h-4 w-4" />
                  Salvar Configurações
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Faturamento</CardTitle>
              <CardDescription>
                Configure suas informações de faturamento e impostos.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="tax-id">CNPJ</Label>
                <Input
                  id="tax-id"
                  placeholder="00.000.000/0000-00"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="tax-rate">Taxa de Imposto (%)</Label>
                <Input
                  id="tax-rate"
                  type="number"
                  placeholder="0"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="invoice-prefix">Prefixo da Fatura</Label>
                <Input
                  id="invoice-prefix"
                  placeholder="SAL-"
                />
              </div>
              
              <div className="flex justify-end pt-4">
                <Button className="flex items-center gap-2">
                  <Save className="h-4 w-4" />
                  Salvar Configurações
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <Card>
        <CardHeader>
          <CardTitle>Suporte</CardTitle>
          <CardDescription>
            Precisa de ajuda? Nossa equipe de suporte está pronta para ajudá-lo.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="outline" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Contatar Suporte
            </Button>
            
            <Button variant="outline" className="flex items-center gap-2">
              <HelpCircle className="h-4 w-4" />
              Perguntas Frequentes
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConfiguracoesPage;
