import AnotherContract from 0x02

pub contract Basic {
    pub let message: String

    pub fun getMessage(): String {
        return self.message
    }

    init(){
        self.message = "Hello, Testing Library"
    }
}