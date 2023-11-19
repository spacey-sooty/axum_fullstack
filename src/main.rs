use axum::{routing::get, Router};

#[derive(serde::Deserialize, useful_macros::From)]
struct Foo {
    message: String,
}

fn json_handler() -> axum::Json<Foo> {
    axum::Json(Foo::from("Hello, World!".to_string()))
}

#[tokio::main]
async fn main() {
    // build our application with a single route
    let app = Router::new()
        .route("/", get(json_handler));

    // run it with hyper on localhost:3000
    axum::Server::bind(&"127.0.0.1:8000".parse().unwrap())
        .serve(app.into_make_service())
        .await
        .unwrap();
}
