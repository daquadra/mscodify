"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, ImageOff } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  tags: string[];
  badges: string[];
  link?: string;
  delay?: number;
}

export default function ProjectCard({ title, description, image, tags, badges, link, delay = 0 }: ProjectCardProps) {
  const [imageFailed, setImageFailed] = useState(false);
  const showImage = Boolean(image) && !imageFailed;
  const hasLink = Boolean(link) && link !== "#";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
    >
      <Card className="overflow-hidden border-border/50 bg-card/50 hover:bg-card/80 transition-all duration-300 group h-full flex flex-col">
        <div className="relative aspect-video overflow-hidden">
          {showImage ? (
            <img 
              src={image} 
              alt={title} 
              className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-500"
              onError={() => setImageFailed(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-muted/60 via-background to-muted/40 text-muted-foreground">
              <div className="flex items-center gap-2 text-sm font-medium">
                <ImageOff className="h-4 w-4" />
                Sem imagem
              </div>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent opacity-60" />
        </div>
        
        <CardHeader className="space-y-2 pb-2">
          <div className="flex flex-wrap gap-2 mb-2">
            {badges.map((badge) => (
              <Badge key={badge} className="bg-foreground/10 text-foreground border-foreground/20">
                {badge}
              </Badge>
            ))}
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                {tag}
              </Badge>
            ))}
          </div>
          <h3 className="text-xl font-heading font-bold group-hover:text-primary transition-colors">
            {title}
          </h3>
        </CardHeader>
        
        <CardContent className="flex-grow">
          <p className="text-muted-foreground text-sm leading-relaxed">
            {description}
          </p>
        </CardContent>
        
        <CardFooter className="pt-4 border-t border-border/50">
          {hasLink ? (
            <Button 
              variant="ghost" 
              className="w-full group/btn hover:bg-primary/10 hover:text-primary"
              asChild
            >
              <a href={link} target="_blank" rel="noopener noreferrer">
                Ver Projeto Online
                <ExternalLink className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
              </a>
            </Button>
          ) : (
            <div className="w-full text-center text-sm text-muted-foreground">
              Site em construção
            </div>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
}
