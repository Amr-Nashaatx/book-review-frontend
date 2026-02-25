import BooksTableRow from "./BooksTableRow";

export default function BooksTable({ booksData }) {
  return (
    <figure>
      <table role="grid">
        <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Status</th>
            <th scope="col" className="text-center">
              Chapters
            </th>
            <th scope="col">Last Edited</th>
            <th scope="col" style={{ textAlign: "right" }}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {booksData.map((book) => (
            <BooksTableRow key={book._id} bookData={book} />
          ))}
        </tbody>
      </table>
    </figure>
  );
}
