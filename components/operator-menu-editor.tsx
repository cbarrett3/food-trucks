"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Upload, Plus, X, Image, Edit2, Trash2, Camera, Check, AlertCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

interface MenuItem {
  id: string
  name: string
  description: string
  price: string
  category: string
  image?: string
  featured: boolean
}

export function OperatorMenuEditor() {
  const [activeTab, setActiveTab] = useState("upload")
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [menuImage, setMenuImage] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)
  
  const fileInputRef = useRef<HTMLInputElement>(null)
  const menuImageInputRef = useRef<HTMLInputElement>(null)
  
  // categories for menu items
  const categories = [
    "appetizers",
    "main dishes",
    "sides",
    "desserts",
    "drinks",
    "specials",
  ]
  
  // handle menu image upload
  const handleMenuImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    
    setIsUploading(true)
    setUploadProgress(0)
    
    // simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        const newProgress = prev + 10
        if (newProgress >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            const reader = new FileReader()
            reader.onload = () => {
              setMenuImage(reader.result as string)
              setIsUploading(false)
            }
            reader.readAsDataURL(file)
          }, 500)
        }
        return newProgress
      })
    }, 200)
  }
  
  // handle item image upload
  const handleItemImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !editingItem) return
    
    const reader = new FileReader()
    reader.onload = () => {
      setEditingItem({
        ...editingItem,
        image: reader.result as string
      })
    }
    reader.readAsDataURL(file)
  }
  
  // add a new menu item
  const addMenuItem = () => {
    setEditingItem({
      id: Date.now().toString(),
      name: "",
      description: "",
      price: "",
      category: categories[0],
      featured: false
    })
    setIsDialogOpen(true)
  }
  
  // edit an existing menu item
  const editMenuItem = (item: MenuItem) => {
    setEditingItem({ ...item })
    setIsDialogOpen(true)
  }
  
  // save menu item changes
  const saveMenuItem = () => {
    if (!editingItem) return
    
    if (menuItems.some(item => item.id === editingItem.id)) {
      // update existing item
      setMenuItems(menuItems.map(item => 
        item.id === editingItem.id ? editingItem : item
      ))
    } else {
      // add new item
      setMenuItems([...menuItems, editingItem])
    }
    
    setIsDialogOpen(false)
    setEditingItem(null)
  }
  
  // delete a menu item
  const deleteMenuItem = (id: string) => {
    setMenuItems(menuItems.filter(item => item.id !== id))
  }
  
  // save all menu changes
  const saveMenu = () => {
    setIsSaving(true)
    
    // simulate saving delay
    setTimeout(() => {
      setIsSaving(false)
      setSaveSuccess(true)
      
      // reset success message after 3 seconds
      setTimeout(() => {
        setSaveSuccess(false)
      }, 3000)
    }, 1000)
  }
  
  return (
    <div className="space-y-6">
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 h-10 bg-muted/50 dark:bg-gray-800/30" aria-label="menu editor tabs">
          <TabsTrigger 
            value="upload" 
            className="data-[state=active]:bg-background/90 dark:data-[state=active]:bg-gray-800/60"
            aria-label="upload menu tab"
          >
            upload menu
          </TabsTrigger>
          <TabsTrigger 
            value="items" 
            className="data-[state=active]:bg-background/90 dark:data-[state=active]:bg-gray-800/60"
            aria-label="menu items tab"
          >
            menu items
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="upload" className="mt-6 space-y-4">
          <Card className="shadow-sm border-border/30 dark:border-gray-800/40 bg-background/80 dark:bg-gray-900/60 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-foreground/90 dark:text-foreground/95">upload menu image</CardTitle>
              <CardDescription className="text-muted-foreground/80 dark:text-muted-foreground/70">
                upload an image of your menu for customers to view
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {!menuImage && !isUploading ? (
                <div 
                  className="border-2 border-dashed border-border/50 dark:border-gray-800/60 rounded-lg p-8 text-center cursor-pointer hover:border-primary/30 transition-colors"
                  onClick={() => menuImageInputRef.current?.click()}
                  aria-label="click to upload menu image"
                >
                  <input
                    type="file"
                    ref={menuImageInputRef}
                    onChange={handleMenuImageUpload}
                    accept="image/*"
                    className="hidden"
                    aria-hidden="true"
                  />
                  <div className="flex flex-col items-center gap-2">
                    <div className="p-3 rounded-full bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-foreground">
                      <Upload className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground/90 dark:text-foreground/95">drag and drop or click to upload</p>
                      <p className="text-xs text-muted-foreground/80 dark:text-muted-foreground/70 mt-1">
                        supports JPG, PNG, PDF up to 10MB
                      </p>
                    </div>
                  </div>
                </div>
              ) : isUploading ? (
                <div className="border-2 border-border/50 dark:border-gray-800/60 rounded-lg p-8 text-center">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-full bg-muted/50 dark:bg-gray-800/50 rounded-full h-2 overflow-hidden">
                      <motion.div 
                        className="h-full bg-primary" 
                        initial={{ width: 0 }}
                        animate={{ width: `${uploadProgress}%` }}
                        transition={{ duration: 0.2 }}
                      />
                    </div>
                    <p className="text-sm text-muted-foreground/80 dark:text-muted-foreground/70">
                      uploading... {uploadProgress}%
                    </p>
                  </div>
                </div>
              ) : (
                <div className="relative">
                  <img 
                    src={menuImage || ""} 
                    alt="Menu" 
                    className="w-full h-auto rounded-lg border border-border/30 dark:border-gray-800/40"
                  />
                  <div className="absolute top-2 right-2 flex gap-2">
                    <Button 
                      size="icon" 
                      variant="secondary" 
                      className="h-8 w-8 rounded-full bg-background/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-sm"
                      onClick={() => menuImageInputRef.current?.click()}
                      aria-label="replace menu image"
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button 
                      size="icon" 
                      variant="destructive" 
                      className="h-8 w-8 rounded-full bg-background/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-sm"
                      onClick={() => setMenuImage(null)}
                      aria-label="remove menu image"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
              
              <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-md p-3 text-amber-800 dark:text-amber-300 text-sm flex items-start gap-2">
                <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">tip: make it easy for customers</p>
                  <p>upload a clear, high-resolution image of your menu. you can also add individual items in the "menu items" tab.</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button 
                onClick={saveMenu} 
                disabled={!menuImage && menuItems.length === 0}
                aria-label="save menu"
              >
                {isSaving ? (
                  <>saving...</>
                ) : saveSuccess ? (
                  <>saved <Check className="ml-2 h-4 w-4" /></>
                ) : (
                  <>save menu</>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="items" className="mt-6 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-medium text-foreground/90 dark:text-foreground/95">menu items</h3>
            <Button 
              size="sm" 
              onClick={addMenuItem}
              className="h-8"
              aria-label="add new menu item"
            >
              <Plus className="h-4 w-4 mr-1" /> add item
            </Button>
          </div>
          
          {menuItems.length === 0 ? (
            <Card className="shadow-sm border-border/30 dark:border-gray-800/40 bg-background/80 dark:bg-gray-900/60 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="flex flex-col items-center gap-2">
                  <div className="p-3 rounded-full bg-muted/50 dark:bg-gray-800/50 text-muted-foreground">
                    <Image className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <p className="text-sm text-muted-foreground/80 dark:text-muted-foreground/70">no menu items added yet</p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mt-2"
                    onClick={addMenuItem}
                    aria-label="add your first menu item"
                  >
                    <Plus className="h-4 w-4 mr-1" /> add your first item
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <AnimatePresence>
                {menuItems.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Card className="shadow-sm border-border/30 dark:border-gray-800/40 bg-background/80 dark:bg-gray-900/60 backdrop-blur-sm overflow-hidden">
                      <div className="flex">
                        {item.image ? (
                          <div className="w-24 h-24 flex-shrink-0">
                            <img 
                              src={item.image} 
                              alt={item.name} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ) : (
                          <div className="w-24 h-24 flex-shrink-0 bg-muted/50 dark:bg-gray-800/50 flex items-center justify-center">
                            <Image className="h-6 w-6 text-muted-foreground/50" aria-hidden="true" />
                          </div>
                        )}
                        <div className="p-3 flex-1">
                          <div className="flex justify-between">
                            <div>
                              <h4 className="text-sm font-medium text-foreground/90 dark:text-foreground/95 line-clamp-1">{item.name}</h4>
                              <p className="text-xs text-muted-foreground/80 dark:text-muted-foreground/70 line-clamp-2 mt-0.5">{item.description}</p>
                            </div>
                            <p className="text-sm font-medium text-foreground/90 dark:text-foreground/95">${item.price}</p>
                          </div>
                          <div className="flex justify-between items-center mt-2">
                            <Badge variant="outline" className="text-xs bg-muted/30 dark:bg-gray-800/40 border-muted/50 dark:border-gray-700/50">
                              {item.category}
                            </Badge>
                            {item.featured && (
                              <Badge className="bg-primary/10 hover:bg-primary/15 text-primary/90 dark:bg-primary/20 dark:text-primary-foreground dark:border-primary/30">
                                featured
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="border-t border-border/20 dark:border-gray-800/40 px-3 py-2 flex justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 px-2 text-xs"
                          onClick={() => editMenuItem(item)}
                          aria-label={`edit ${item.name}`}
                        >
                          <Edit2 className="h-3.5 w-3.5 mr-1" /> edit
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 px-2 text-xs text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                          onClick={() => deleteMenuItem(item.id)}
                          aria-label={`delete ${item.name}`}
                        >
                          <Trash2 className="h-3.5 w-3.5 mr-1" /> delete
                        </Button>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
          
          <div className="flex justify-end">
            <Button 
              onClick={saveMenu} 
              disabled={menuItems.length === 0 && !menuImage}
              aria-label="save menu items"
            >
              {isSaving ? (
                <>saving...</>
              ) : saveSuccess ? (
                <>saved <Check className="ml-2 h-4 w-4" /></>
              ) : (
                <>save menu</>
              )}
            </Button>
          </div>
        </TabsContent>
      </Tabs>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{editingItem?.id ? 'edit' : 'add'} menu item</DialogTitle>
            <DialogDescription>
              enter the details for this menu item
            </DialogDescription>
          </DialogHeader>
          
          {editingItem && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="item-name">item name</Label>
                <Input
                  id="item-name"
                  value={editingItem.name}
                  onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                  placeholder="e.g. Classic Burger"
                  aria-label="item name"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="item-description">description</Label>
                <Textarea
                  id="item-description"
                  value={editingItem.description}
                  onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                  placeholder="Describe your menu item..."
                  className="resize-none"
                  rows={3}
                  aria-label="item description"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="item-price">price ($)</Label>
                  <Input
                    id="item-price"
                    value={editingItem.price}
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^\d.]/g, '')
                      setEditingItem({ ...editingItem, price: value })
                    }}
                    placeholder="0.00"
                    aria-label="item price"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="item-category">category</Label>
                  <select
                    id="item-category"
                    value={editingItem.category}
                    onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                    className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    aria-label="item category"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>item image</Label>
                {editingItem.image ? (
                  <div className="relative rounded-md overflow-hidden">
                    <img 
                      src={editingItem.image} 
                      alt={editingItem.name} 
                      className="w-full h-32 object-cover"
                    />
                    <div className="absolute top-2 right-2 flex gap-2">
                      <Button 
                        size="icon" 
                        variant="secondary" 
                        className="h-8 w-8 rounded-full bg-background/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-sm"
                        onClick={() => fileInputRef.current?.click()}
                        aria-label="change item image"
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="icon" 
                        variant="destructive" 
                        className="h-8 w-8 rounded-full bg-background/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-sm"
                        onClick={() => setEditingItem({ ...editingItem, image: undefined })}
                        aria-label="remove item image"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div 
                    className="border-2 border-dashed border-border/50 dark:border-gray-800/60 rounded-md p-4 text-center cursor-pointer hover:border-primary/30 transition-colors"
                    onClick={() => fileInputRef.current?.click()}
                    aria-label="click to upload item image"
                  >
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleItemImageUpload}
                      accept="image/*"
                      className="hidden"
                      aria-hidden="true"
                    />
                    <div className="flex flex-col items-center gap-2">
                      <div className="p-2 rounded-full bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-foreground">
                        <Camera className="h-5 w-5" aria-hidden="true" />
                      </div>
                      <p className="text-xs text-muted-foreground/80 dark:text-muted-foreground/70">
                        click to upload an image
                      </p>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  id="featured"
                  checked={editingItem.featured}
                  onCheckedChange={(checked) => setEditingItem({ ...editingItem, featured: checked })}
                  aria-label="featured item toggle"
                />
                <Label htmlFor="featured" className="text-sm">mark as featured item</Label>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>cancel</Button>
            <Button onClick={saveMenuItem} disabled={!editingItem?.name || !editingItem?.price}>save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
