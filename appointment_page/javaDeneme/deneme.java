


public class deneme{
    public static void main(String[] args) {
        System.out.println("Hello");

        Card ourCard = new Card(50,35,"student","abcd");
        Passenger ourPassenger = new Passenger("Mert", "Çelik", 35, "student", ourCard);
        String[] routes = {"A","B","C"};
        Passenger[] passengers = {ourPassenger};
        Bus newBus = new Bus("abc", "A",  routes, passengers, 10, 1, 2, 0);
        System.out.println(newBus.calculateFare(ourPassenger));
        System.out.println(newBus.boardPassenger(ourPassenger));
    }
}

