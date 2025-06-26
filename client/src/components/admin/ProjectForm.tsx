import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"
import { createPortfolioProject } from "@/api/portfolio"
import { useToast } from "@/hooks/useToast"

interface ProjectFormProps {
  onProjectCreated: () => void
}

export function ProjectForm({ onProjectCreated }: ProjectFormProps) {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    image: "",
    liveUrl: "",
    githubUrl: "",
    status: "active",
    duration: "3 months",
    teamSize: "4 members",
    rating: "5.0/5.0"
  })
  const [technologies, setTechnologies] = useState<string[]>([])
  const [techInput, setTechInput] = useState("")
  const [features, setFeatures] = useState<string[]>([])
  const [featureInput, setFeatureInput] = useState("")
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const addTechnology = () => {
    if (techInput.trim() && !technologies.includes(techInput.trim())) {
      setTechnologies(prev => [...prev, techInput.trim()])
      setTechInput("")
    }
  }

  const removeTechnology = (tech: string) => {
    setTechnologies(prev => prev.filter(t => t !== tech))
  }

  const addFeature = () => {
    if (featureInput.trim() && !features.includes(featureInput.trim())) {
      setFeatures(prev => [...prev, featureInput.trim()])
      setFeatureInput("")
    }
  }

  const removeFeature = (feature: string) => {
    setFeatures(prev => prev.filter(f => f !== feature))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.title || !formData.category || !formData.description) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    if (technologies.length === 0) {
      toast({
        title: "Error",
        description: "Please add at least one technology",
        variant: "destructive",
      })
      return
    }

    try {
      setLoading(true)
      const projectData = {
        ...formData,
        technologies,
        features,
        client: {
          name: "John Doe",
          role: "CEO",
          feedback: "Excellent work! The team delivered beyond our expectations.",
          avatar: "JD"
        }
      }

      await createPortfolioProject(projectData)
      
      toast({
        title: "Success",
        description: "Project created successfully!",
      })

      // Reset form
      setFormData({
        title: "",
        category: "",
        description: "",
        image: "",
        liveUrl: "",
        githubUrl: "",
        status: "active",
        duration: "3 months",
        teamSize: "4 members",
        rating: "5.0/5.0"
      })
      setTechnologies([])
      setFeatures([])
      
      onProjectCreated()
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Create New Project</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title *</label>
            <Input
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              placeholder="Project title"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Category *</label>
            <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Web Design">Web Design</SelectItem>
                <SelectItem value="Mobile App">Mobile App</SelectItem>
                <SelectItem value="E-commerce">E-commerce</SelectItem>
                <SelectItem value="Branding">Branding</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description *</label>
            <Textarea
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Project description"
              rows={3}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Image URL</label>
            <Input
              value={formData.image}
              onChange={(e) => handleInputChange("image", e.target.value)}
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Live URL</label>
              <Input
                value={formData.liveUrl}
                onChange={(e) => handleInputChange("liveUrl", e.target.value)}
                placeholder="https://example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">GitHub URL</label>
              <Input
                value={formData.githubUrl}
                onChange={(e) => handleInputChange("githubUrl", e.target.value)}
                placeholder="https://github.com/user/repo"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Technologies *</label>
            <div className="flex gap-2 mb-2">
              <Input
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                placeholder="Add technology"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTechnology())}
              />
              <Button type="button" onClick={addTechnology}>Add</Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {technologies.map((tech, index) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-1">
                  {tech}
                  <X className="w-3 h-3 cursor-pointer" onClick={() => removeTechnology(tech)} />
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Features</label>
            <div className="flex gap-2 mb-2">
              <Input
                value={featureInput}
                onChange={(e) => setFeatureInput(e.target.value)}
                placeholder="Add feature"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
              />
              <Button type="button" onClick={addFeature}>Add</Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {features.map((feature, index) => (
                <Badge key={index} variant="outline" className="flex items-center gap-1">
                  {feature}
                  <X className="w-3 h-3 cursor-pointer" onClick={() => removeFeature(feature)} />
                </Badge>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Status</label>
              <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Duration</label>
              <Input
                value={formData.duration}
                onChange={(e) => handleInputChange("duration", e.target.value)}
                placeholder="3 months"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Team Size</label>
              <Input
                value={formData.teamSize}
                onChange={(e) => handleInputChange("teamSize", e.target.value)}
                placeholder="4 members"
              />
            </div>
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Creating..." : "Create Project"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}