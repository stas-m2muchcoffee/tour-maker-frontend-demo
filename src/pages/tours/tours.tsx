import { RecommendedToursSection } from "./recommended-tours-section";
import { MyToursSection } from "./my-tours-section";

const ToursPage = () => {
  return (
    <div className="space-y-8">
      <RecommendedToursSection />
      <MyToursSection />
    </div>
  );
};

export default ToursPage;
