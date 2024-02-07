const EMPTY = []

const SMALL = [
  {
    id: 1,
    author: {
      name: "Elon",
      link: "@Elon_1984"
    },
    message: "Lorem ipsum ...",
    likes: 2,
    comments: [
       {
         id: 3,
         //twistId: 1
         message: "Lorem ipsum ...",
         like: 0,
         author: {
           name: "Elon",
           link: "@Elon_1984"
         }
       },
       {
         id: 4,
         //twistId: 1
         message: "Lorem ipsum ...",
         like: 0,
         author: {
           name: "Elon",
           link: "@Elon_1984"
         }           
       }
    ]
  },
  {
    id: 2,
    author: {
      name: "Elon",
      link: "@Elon_1984"
    },
    message: "Lorem ipsum ...",
    like: 0,
    comments: []
  }
];

const MEDIUM = [
 //...
]

const LARGE = [
 //...
]

export const fakeData = {
  EMPTY,
  SMALL,
  MEDIUM,
  LARGE
}