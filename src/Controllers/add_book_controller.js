// const { getavailableBookCount } = require("../services/available_book_count");
// const { getTotalBookCount } = require("../services/total_Book_Count");
const { countbook, bookRegistration } = require("../services/add_book_service");
const { userprofile } = require("../services/users_profile_service");


exports.bookRegister_post_Controller = async (req, res) => {
  //   const total = await getavailableBookCount(req, res);
  const book = await bookRegistration(req, res);
 
  //   const data = await getTotalBookCount(req, res);

  if (book.success) {
    res.redirect("/api/add_books");
    console.log(book.message);
  } else {
    console.log(book.message);
  }
};

exports.bookRegister_get_Controller = async (req, res) => {
  const data = await countbook(req, res);
  let dataadmin = await userprofile(req, res);
  res.render("add_books", {
    NewprimaryKey: data.NewprimaryKey,
    Dataad: dataadmin.data,
  });
};
