import { Db, MongoClient } from 'mongodb';

// MongoDB connection details
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.qucfh.mongodb.net/better-blog?retryWrites=true&w=majority&appName=Cluster0&tls=true`;
const client = new MongoClient(uri);

async function getLastCategoryId(db: Db): Promise<number> {
  // Find the last category sorted by categoryId in descending order
  const lastCategory = await db.collection('categories').find({}).sort({ categoryId: -1 }).limit(1).toArray();

  // Log the fetched last category for debugging
  console.log('Last Category:', lastCategory);

  // Check if lastCategory exists and has a valid categoryId
  if (lastCategory.length > 0 && typeof lastCategory[0].categoryId === 'number') {
    return lastCategory[0].categoryId; // Return the last categoryId
  } else {
    return 0; // No categories exist, return 0
  }
}

async function addCategory(db: Db, name: string) {
  try {
    // Get the new category ID
    const lastCategoryId = await getLastCategoryId(db);
    console.log('Last Category ID:', lastCategoryId); // Log the last category ID

    const newCategoryId = lastCategoryId + 1; // Increment the last ID
    console.log('New Category ID:', newCategoryId); // Log the new category ID

    const result = await db.collection('categories').insertOne({
      categoryId: newCategoryId, // Insert the new category ID
      CategoryName: name,
    });

    return result;
  } catch (error) {
    console.error('Error adding category:', error);
    throw error; // Rethrow the error to handle it in the POST function
  }
}

// Ensure the request parameter is of type NextRequest
export async function POST(request: Request) {
  try {
    // Parse JSON body from the request
    const { CategoryName } = await request.json();

    // Validate CategoryName input
    if (!CategoryName) {
      return new Response(JSON.stringify({ message: "Category name is required" }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    let db;
    try {
      await client.connect();
      db = client.db('better-blog'); // Replace with your database name

      const result = await addCategory(db, CategoryName);
      return new Response(JSON.stringify({ message: "Category created", result }), {
        status: 201,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      console.error('Error creating category:', error); // Log the error for debugging
      return new Response(JSON.stringify({ message: "Error creating category", error }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
  } catch (error) {
    console.error('Error parsing request:', error);
    return new Response(JSON.stringify({ message: "Invalid JSON" }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } finally {
    await client.close(); // Ensure the client is closed even if an error occurs
  }
}