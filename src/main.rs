use axum::{routing::get, Router, extract::Json};

#[derive(serde::Deserialize, useful_macros::From)]
struct Foo {
    message: String,
}

fn json_handler() -> dyn Fn(Json<Foo>) {
    || async { axum::Json(Foo::from("Hello, World!".to_string())) }
}

#[tokio::main]
async fn main() {
    // build our application with a single route
    let app = Router::new()
        .route("/", get(Box<json_handler>));

    // run it with hyper on localhost:3000
    axum::Server::bind(&"127.0.0.1:8000".parse().unwrap())
        .serve(app.into_make_service())
        .await
        .unwrap();
}
