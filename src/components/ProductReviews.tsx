
import { useState } from "react";
import { Star, ThumbsUp, MessageSquare, Flag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Review {
  id: number;
  user: string;
  avatar?: string;
  rating: number;
  date: string;
  content: string;
  helpful: number;
  replies: number;
}

interface ProductReviewsProps {
  averageRating: number;
  totalReviews: number;
  ratingDistribution: number[];
  reviews: Review[];
}

export const ProductReviews = ({
  averageRating,
  totalReviews,
  ratingDistribution,
  reviews
}: ProductReviewsProps) => {
  const [activeTab, setActiveTab] = useState("all");
  const [expandedReviews, setExpandedReviews] = useState<number[]>([]);
  const [helpfulReviews, setHelpfulReviews] = useState<number[]>([]);
  
  const toggleExpandReview = (id: number) => {
    if (expandedReviews.includes(id)) {
      setExpandedReviews(expandedReviews.filter(reviewId => reviewId !== id));
    } else {
      setExpandedReviews([...expandedReviews, id]);
    }
  };
  
  const markAsHelpful = (id: number) => {
    if (!helpfulReviews.includes(id)) {
      setHelpfulReviews([...helpfulReviews, id]);
    }
  };
  
  const filteredReviews = reviews.filter(review => {
    if (activeTab === "all") return true;
    if (activeTab === "5star" && review.rating === 5) return true;
    if (activeTab === "4star" && review.rating === 4) return true;
    if (activeTab === "3star" && review.rating === 3) return true;
    if (activeTab === "2star" && review.rating === 2) return true;
    if (activeTab === "1star" && review.rating === 1) return true;
    return false;
  });

  return (
    <div className="border rounded-lg p-6 bg-white">
      <h2 className="text-2xl font-bold mb-6">Avaliações dos Clientes</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        {/* Summary */}
        <div className="col-span-1 flex flex-col items-center justify-center">
          <div className="text-5xl font-bold text-primary mb-1">{averageRating.toFixed(1)}</div>
          <div className="flex items-center mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`h-5 w-5 ${
                  star <= Math.round(averageRating) 
                    ? "text-yellow-400 fill-yellow-400" 
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <div className="text-gray-500 text-sm">
            Baseado em {totalReviews} avaliações
          </div>
        </div>
        
        {/* Rating Distribution */}
        <div className="col-span-2">
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((rating, index) => {
              const percentage = (ratingDistribution[5 - rating] / totalReviews) * 100;
              return (
                <div key={rating} className="flex items-center gap-2">
                  <div className="flex items-center w-16">
                    <span className="text-sm text-gray-600">{rating}</span>
                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 ml-1" />
                  </div>
                  <Progress value={percentage} className="h-2 flex-grow" />
                  <span className="text-sm text-gray-500 w-12 text-right">
                    {percentage.toFixed(0)}%
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      
      {/* Tabs & Filters */}
      <Tabs defaultValue="all" className="mb-6" onValueChange={setActiveTab}>
        <TabsList className="w-full">
          <TabsTrigger value="all">Todas ({totalReviews})</TabsTrigger>
          <TabsTrigger value="5star">5 Estrelas ({ratingDistribution[0]})</TabsTrigger>
          <TabsTrigger value="4star">4 Estrelas ({ratingDistribution[1]})</TabsTrigger>
          <TabsTrigger value="3star">3 Estrelas ({ratingDistribution[2]})</TabsTrigger>
          <TabsTrigger value="2star">2 Estrelas ({ratingDistribution[3]})</TabsTrigger>
          <TabsTrigger value="1star">1 Estrela ({ratingDistribution[4]})</TabsTrigger>
        </TabsList>
      </Tabs>
      
      {/* Reviews List */}
      <div className="space-y-6">
        {filteredReviews.length > 0 ? (
          filteredReviews.map((review) => (
            <div key={review.id} className="border-b pb-6 last:border-b-0 last:pb-0">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center">
                  <Avatar className="h-10 w-10 mr-3">
                    <AvatarImage src={review.avatar} alt={review.user} />
                    <AvatarFallback>{review.user.charAt(0).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{review.user}</div>
                    <div className="text-sm text-gray-500">{review.date}</div>
                  </div>
                </div>
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-4 w-4 ${
                        star <= review.rating 
                          ? "text-yellow-400 fill-yellow-400" 
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
              
              <div className={`text-gray-700 ${
                !expandedReviews.includes(review.id) && review.content.length > 300 
                  ? "line-clamp-3" 
                  : ""
              }`}>
                {review.content}
              </div>
              
              {review.content.length > 300 && (
                <Button 
                  variant="ghost" 
                  className="p-0 h-auto text-primary hover:text-primary/80 hover:bg-transparent mt-1"
                  onClick={() => toggleExpandReview(review.id)}
                >
                  {expandedReviews.includes(review.id) ? "Ver menos" : "Ver mais"}
                </Button>
              )}
              
              <div className="flex items-center mt-4 text-sm text-gray-500 space-x-6">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className={`flex items-center gap-1 ${helpfulReviews.includes(review.id) ? 'text-primary' : ''}`}
                  onClick={() => markAsHelpful(review.id)}
                  disabled={helpfulReviews.includes(review.id)}
                >
                  <ThumbsUp className="h-4 w-4" />
                  <span>Útil ({review.helpful + (helpfulReviews.includes(review.id) ? 1 : 0)})</span>
                </Button>
                
                <Button variant="ghost" size="sm" className="flex items-center gap-1">
                  <MessageSquare className="h-4 w-4" />
                  <span>Responder ({review.replies})</span>
                </Button>
                
                <Button variant="ghost" size="sm" className="flex items-center gap-1">
                  <Flag className="h-4 w-4" />
                  <span>Reportar</span>
                </Button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-10">
            <MessageSquare className="h-12 w-12 text-gray-300 mx-auto mb-2" />
            <h3 className="text-lg font-medium">Nenhuma avaliação encontrada</h3>
            <p className="text-gray-500">Não há avaliações para os filtros selecionados.</p>
          </div>
        )}
      </div>
      
      {filteredReviews.length > 5 && (
        <div className="mt-6 text-center">
          <Button variant="outline">Ver Mais Avaliações</Button>
        </div>
      )}
    </div>
  );
};
