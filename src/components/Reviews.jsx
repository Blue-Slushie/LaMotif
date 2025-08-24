import React from "react";
import { assets } from "../assets/assets";

const reviews = [
  {
    name: "Anonymous",
    date: "August 2025",
    text: "I am completely in awe of La Motif jewelry line 🤩Each piece is crafted in 92.5 sterling silver and feels more like a treasured heirloom than just an accessory. The craftsmanship is exquisite, refined, elegant, and full of soul. These are not your everyday casual pieces; they are timeless works of art meant to be cherished. Every detail is beautifully executed, from the weight and polish of the silver to the thoughtful, unique designs. When I wear her jewelry, I feel like I’m wearing something with meaning, something that will be just as stunning and special decades from now. These are the kind of pieces you pass down. I already know I’ll be giving them to my daughters one day, and I love the idea of them carrying a piece of my story through these designs. Monalisa’s work is beyond beautiful😍it’s enduring, soulful, and unforgettable. I highly recommend La Motif Silver Jewelry & Couture LLC to anyone who values beauty, quality, and intention. Once you try her jewelry, you’ll absolutely come back for more. ♥️ ♥️ ♥️ ♥️ ♥️",
    image: assets.profile,
  },
  {
    name: "Anonymous",
    date: "February 2020",
    text: "What can I say about Monalisa and her collection… I am a customer of her from the pandemic era…  Every piece exudes elegance and individuality, showcasing a perfect blend of artistry and craftsmanship. Whether you’re looking for something bold and statement-making or subtle and classic, this collection has something for every style and occasion. What sets her collection apart is the attention to detail and use of high-quality materials. Each design feels thoughtful and well-crafted, with a keen eye for both aesthetics and functionality. From intricate rings and necklaces to stunning bangles and earrings, the variety is impressive, and every piece tells its own unique story. The versatility of the collection also deserves mention—whether you’re dressing up for a formal event or adding a touch of glam to an everyday look, these pieces effortlessly enhance any outfit. They strike the perfect balance between modern trends and timeless beauty, making them ideal for anyone looking to invest in jewelry that they’ll treasure for years to come. Overall, La Motifs jewelry collection is nothing short of extraordinary. If you’re in the market for high-quality, beautifully designed pieces, I highly recommend checking it out. You won’t be disappointed! With Love for Mona … Ronita",
    image: assets.profile,
  },
  {
    name: "Anonymous",
    date: "July 2025",
    text: "The silver jewelry pieces that I have from mona are one of a kind, and I treasure each one of them. The beauty, versatility and craftsmanship of every piece in my collection that I have from her is exceptional. Mona goes out of her way to bring us colorful and ethnic pieces as well as contemporary designs of such variety and quality that they are very difficult to resist! I have to say that even my daughter-in-laws love to flaunt the jewelry that I have bought for them from her.",
    image: assets.profile,
  },

  {
    name: "Anonymous",
    date: "February 2025",
    text: "100 percent recommended Page. Monalisa is a great postive attitude person,very loving,wonderful customer support and what not .....she is simply amazing..Her style and her collections are beyond ..i would say extreme and i definitely recommend to every body .I am following her page since 2024 and she has unique collections and her dressing styles are so unique too....i purchased a silver jewelry and  a saree recently and the quality is worth the price ....kuddos to you Monalisa.",
    image: assets.profile,
  },
  
  {
    name: "Anonymous",
    date: "December 2024",
    text: "I have had wonderful experience for many years as a customer with La Motif Silver jewelry and its owner. Lovely collection and wonderful service with good prices. Very easy to communicate and accommodating. Will continue shopping with them in future. Best wishes!",
    image: assets.profile,
  },
  {
    name: "Anonymous",
    date: "August 2024",
    text: "Always satisfied with La Motif quality of the products. she have huge collection of 92.5 pure silver jewelry are exactly as shown on the photos , offers great price. She is very responsive. I highly recommend!",
    image: assets.profile,
  },

  
];

export default function Reviews() {
  return (
    <section className="my-12">
      <h2 className="text-2xl font-semibold tracking-tight mb-6">Customer Reviews</h2>

      <div className="grid gap-6 md:grid-cols-2">
        {reviews.map((review, idx) => (
          <div key={idx} className="bg-white rounded-lg shadow-md p-5 flex gap-4">
            <img
              src={review.image}
              alt={review.name}
              className="w-12 h-12 rounded-full object-cover"
            />

            <div>
              <div className="flex items-center justify-between">
                <p className="font-semibold">{review.name}</p>
                <span className="text-xs text-gray-500">{review.date}</span>
              </div>

              <div className="flex text-yellow-500 text-sm mb-2">
                ★★★★★
              </div>

              <p className="text-gray-700 text-sm">{review.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
