import Card from "./Card";

const Cards = () => {
  return (
    <section className="my-20 xl:grid xl:grid-cols-3">
      <Card
        name="Georges"
        lastName="Madi"
        school="IES Francisco de Goya"
        grade="DAM"
        websiteThoughts="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus tenetur aut, corrupti soluta quam deleniti sapiente voluptas facere repellat! Iste ea porro doloremque suscipit magni necessitatibus asperiores, non voluptas quia."
        middle={false}
      ></Card>
      <Card
        name="Gonzalo"
        lastName="Ramiro"
        school="IES Francisco de Goya"
        grade="DAM"
        websiteThoughts="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus tenetur aut, corrupti soluta quam deleniti sapiente voluptas facere repellat! Iste ea porro doloremque suscipit magni necessitatibus asperiores, non voluptas quia."
        middle={true}
      ></Card>
      <Card
        name="Cristian"
        lastName="Sánchez"
        school="IES Francisco de Goya"
        grade="DAM"
        websiteThoughts="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus tenetur aut, corrupti soluta quam deleniti sapiente voluptas facere repellat! Iste ea porro doloremque suscipit magni necessitatibus asperiores, non voluptas quia."
        middle={false}
      ></Card>
    </section>
  );
};

export default Cards;
