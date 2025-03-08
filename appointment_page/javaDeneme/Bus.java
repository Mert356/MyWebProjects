public class Bus {
    private String id;
    private String currentLocation;
    private String[] routeStops;
    private Passenger[] onBoardPassengers;
    private int currentPassengerCount;
    private double totalEarnings;
    private int totalPassengersTransported;
    private int maxCapacity;

    public Bus(String id, String currentLocation, String[] routeStops, Passenger[] onBoardPassengers,
            double totalEarnings, int totalPassengersTransported, int maxCapacity , int currentPassengerCount) {
        this.id = id;
        this.currentLocation = currentLocation;
        this.routeStops = routeStops;
        this.onBoardPassengers = onBoardPassengers;
        this.totalEarnings = totalEarnings;
        this.currentPassengerCount = currentPassengerCount;
        this.totalPassengersTransported = totalPassengersTransported;
        this.maxCapacity = maxCapacity;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCurrentLocation() {
        return currentLocation;
    }

    public void setCurrentLocation(String currentLocation) {
        this.currentLocation = currentLocation;
    }

    public String[] getRouteStops() {
        return routeStops;
    }

    public void setRouteStops(String[] routeStops) {
        this.routeStops = routeStops;
    }

    public Passenger[] getOnBoardPassengers() {
        return onBoardPassengers;
    }

    public void setOnBoardPassengers(Passenger[] onBoardPassengers) {
        this.onBoardPassengers = onBoardPassengers;
    }

    public double getTotalEarnings() {
        return totalEarnings;
    }

    public void setTotalEarnings(double totalEarnings) {
        this.totalEarnings = totalEarnings;
    }

    public int getTotalPassengersTransported() {
        return totalPassengersTransported;
    }

    public void setTotalPassengersTransported(int totalPassengersTransported) {
        this.totalPassengersTransported = totalPassengersTransported;
    }

    public int getMaxCapacity() {
        return maxCapacity;
    }

    public void setMaxCapacity(int maxCapacity) {
        this.maxCapacity = maxCapacity;
    }
    public int getCurrentPassengerCount() {
        return currentPassengerCount;
    }

    public void setCurrentPassengerCount(int currentPassengerCount) {
        this.currentPassengerCount = currentPassengerCount;
    }
    public boolean boardPassenger( Passenger p){
        if(maxCapacity<=currentPassengerCount){
            return false;
        }
        return p.getCard().spendMoney(calculateFare(p));
    }

    public double calculateFare(Passenger p) {
        double baseFare = 10;
        if (p.getAge() < 12) {
            return baseFare / 2;
        } else if (p.getEducation().equals("student")) {
            return baseFare * 3 / 4;
        } else if (p.getAge() > 65) {
            return baseFare * 4 / 5;
        } else {
            return baseFare;
        }
    }
    public boolean moveToNextStop(){
        int currentIndex = -1;
        for(int i = 0; i<routeStops.length;i++){
            if(routeStops[i].equals(currentLocation)){
                currentIndex = i;
                break;
            }
        }
        if(currentIndex == -1 || currentIndex >= routeStops.length-1){
            return false;
        }
        currentLocation = routeStops[currentIndex];
        return true;
    }

    public boolean alightPassenger(Passenger p){
        for(int i = 0;i<currentPassengerCount;i++){
            if(onBoardPassengers[i]==p){
                for(int j = i;j<onBoardPassengers.length;j++){
                    onBoardPassengers[j] = onBoardPassengers[j+1];
                }
                currentPassengerCount--;
                return true;
            }
        }
        return false;
    }
}
