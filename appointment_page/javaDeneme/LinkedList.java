public class LinkedList {
    private class Node{
        int value;
        Node next;
        public Node(int value){
            this.value = value;
        }
    }

    private Node head;


    public void addLast(int value){
        Node newNode = new Node(value);
        if(head == null){
            head = newNode;
            return;
        }
        Node temp = head;
        while(temp.next != null){
            temp = temp.next;
        }
        temp.next = newNode;
    }
    public void insertAt(int index,int value){
        Node newNode =new Node(value);
        Node temp = head;
        if(newNode == null){
            return;
        }
        for(int i = 0;i< index ;i++){
            temp = temp.next;
        }
    }

    public void removeFirst(){
        if(head ==null) return;
        head = head.next;
    }
    public void removeLast(){
        if(head == null) return;
        if(head.next == null){
            head = null;
            return;
        }
    }
    

}
