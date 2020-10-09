#  Output the kubectl explain deployment --recursive

fr = open("data (1).txt", "r")
# fr = open("data.txt", "r")
fw = open("json_data.json", "a")

parse_arr = fr.readlines()[12:]     #get the elements from FIELDS:\n elements
fw.write("{ \n")

current_location_path = {}
past_space_count = 3

object_state_arr = []


def function_write_data(arr_element, present_space_count):
    """
        It will write the } and }] data to the file
    """
    print("ARRAY", arr_element[::-1])
    for i in arr_element[::-1]:
        if i == 0:
            fw.write(" "*present_space_count + "}, \n")
        else:
            fw.write( " "*present_space_count + "}], \n")

def remove_arr_elements(arr_element, count):
    """
        Remove the elements from object_state_arr
    """
    for _ in range(count):
        arr_element.pop()

    return arr_element

for i in parse_arr:
    element_name = i.split('\t')[0]
    property_name = element_name.strip()   # parsing the property name
    present_space_count = element_name.count(" ")

    if "<map[string]string>" in i:
        if present_space_count < past_space_count:
            if object_state_arr[-1] == 0:
                function_write_data(object_state_arr[len(object_state_arr) - int(abs((past_space_count - present_space_count)/3)) : ], present_space_count)
                fw.write( " "*present_space_count + "\"" + property_name + "\"" + ": [{}],\n")
                object_state_arr = remove_arr_elements(object_state_arr, int(abs((past_space_count - present_space_count)/3)))

            elif object_state_arr[-1] == 1:
                function_write_data(object_state_arr[len(object_state_arr) - int(abs((past_space_count - present_space_count)/3)) : ], present_space_count)
                fw.write( " "*present_space_count + "\"" + property_name + "\"" + ": [{}],\n")
                object_state_arr = remove_arr_elements(object_state_arr, int(abs((past_space_count - present_space_count)/3)))

        else:
            fw.write( " "*present_space_count + "\"" + property_name + "\"" + ": [{}],\n")
    

    if "<string>" in i:
        if present_space_count < past_space_count :
            if object_state_arr[-1] == 0:
                function_write_data(object_state_arr[len(object_state_arr) - int(abs((past_space_count - present_space_count)/3)) : ], present_space_count)
                fw.write( " "*present_space_count + "\"" + property_name + "\"" + ": \" \" ,\n")
                object_state_arr = remove_arr_elements(object_state_arr, int(abs((past_space_count - present_space_count)/3)))
                
            elif object_state_arr[-1] == 1:
                function_write_data(object_state_arr[len(object_state_arr) - int(abs((past_space_count - present_space_count)/3)) : ], present_space_count)
                fw.write( " "*present_space_count + "\"" + property_name + "\"" + ": \" \" ,\n")
                object_state_arr = remove_arr_elements(object_state_arr, int(abs((past_space_count - present_space_count)/3)))

        else:
            fw.write( " "*present_space_count + "\"" + property_name + "\"" + ": \" \" ,\n")
    

    if "<[]string>" in i:
        if present_space_count < past_space_count :
            if object_state_arr[-1] == 0:
                function_write_data(object_state_arr[len(object_state_arr) - int(abs((past_space_count - present_space_count)/3)) : ], present_space_count)
                fw.write( " "*present_space_count + "\"" + property_name + "\"" + ": [\"\"],\n")
                object_state_arr = remove_arr_elements(object_state_arr, int(abs((past_space_count - present_space_count)/3)))
            
            elif object_state_arr[-1] == 1:
                function_write_data(object_state_arr[len(object_state_arr) - int(abs((past_space_count - present_space_count)/3)) : ], present_space_count)
                fw.write( " "*present_space_count + "\"" + property_name + "\"" + ": [\"\"],\n")
                object_state_arr = remove_arr_elements(object_state_arr, int(abs((past_space_count - present_space_count)/3)))
        
        else:
            fw.write( " "*present_space_count + "\"" + property_name + "\"" + ": [\"\"],\n")


    if "<integer>" in i:
        if present_space_count < past_space_count :
            if object_state_arr[-1] == 0:
                function_write_data(object_state_arr[len(object_state_arr) - int(abs((past_space_count - present_space_count)/3)) : ], present_space_count)
                fw.write( " "*present_space_count + "\"" + property_name + "\"" + ": 0 ,\n")
                object_state_arr = remove_arr_elements(object_state_arr, int(abs((past_space_count - present_space_count)/3)))
            
            elif object_state_arr[-1] == 1:
                function_write_data(object_state_arr[len(object_state_arr) - int(abs((past_space_count - present_space_count)/3)) : ], present_space_count)
                fw.write( " "*present_space_count + "\"" + property_name + "\"" + ": 0 ,\n")
                object_state_arr = remove_arr_elements(object_state_arr, int(abs((past_space_count - present_space_count)/3)))
        
        else:
            fw.write( " "*present_space_count + "\"" + property_name + "\"" + ": 0 ,\n")


    if "<boolean>" in i:
        if present_space_count < past_space_count :
            if object_state_arr[-1] == 0:
                function_write_data(object_state_arr[len(object_state_arr) - int(abs((past_space_count - present_space_count)/3)) : ], present_space_count)
                fw.write( " "*present_space_count + "\"" + property_name + "\"" + ": \" \", \n" )
                object_state_arr = remove_arr_elements(object_state_arr, int(abs((past_space_count - present_space_count)/3)))
            
            elif object_state_arr[-1] == 1:
                function_write_data(object_state_arr[len(object_state_arr) - int(abs((past_space_count - present_space_count)/3)) : ], present_space_count)
                fw.write( " "*present_space_count + "\"" + property_name + "\"" + ": \" \", \n" )
                object_state_arr = remove_arr_elements(object_state_arr, int(abs((past_space_count - present_space_count)/3)))
        
        else:
            fw.write( " "*present_space_count + "\"" + property_name + "\"" + ": \" \", \n" )


    if "<[]Object>" in i:
        if present_space_count < past_space_count :
            if object_state_arr[-1] == 0:
                function_write_data(object_state_arr[len(object_state_arr) - int(abs((past_space_count - present_space_count)/3)) : ], present_space_count)
                fw.write( " "*present_space_count + "\"" + property_name + "\"" + ": [{\n" )
                object_state_arr = remove_arr_elements(object_state_arr, int(abs((past_space_count - present_space_count)/3)))
                object_state_arr.append(1)
            
            elif object_state_arr[-1] == 1:
                function_write_data(object_state_arr[len(object_state_arr) - int(abs((past_space_count - present_space_count)/3)) : ], present_space_count)
                fw.write( " "*present_space_count + "\"" + property_name + "\"" + ": [{\n" )
                object_state_arr = remove_arr_elements(object_state_arr, int(abs((past_space_count - present_space_count)/3)))
                object_state_arr.append(1)
        
        else:
            fw.write( " "*present_space_count + "\"" + property_name + "\"" + ": [{\n" )
            object_state_arr.append(1)

    if "<Object>" in i:
        if present_space_count < past_space_count :
            if object_state_arr[-1] == 0:
                function_write_data(object_state_arr[len(object_state_arr) - int(abs((past_space_count - present_space_count)/3)) : ], present_space_count)
                fw.write( " "*present_space_count + "\"" + property_name + "\"" + ": {\n" )
                object_state_arr = remove_arr_elements(object_state_arr, int(abs((past_space_count - present_space_count)/3)))
                object_state_arr.append(0)
            
            elif object_state_arr[-1] == 1:
                function_write_data(object_state_arr[len(object_state_arr) - int(abs((past_space_count - present_space_count)/3)) : ], present_space_count)
                fw.write( " "*present_space_count + "\"" + property_name + "\"" + ": {\n" )
                object_state_arr = remove_arr_elements(object_state_arr, int(abs((past_space_count - present_space_count)/3)))
                object_state_arr.append(0)
        
        else:
            fw.write( " "*present_space_count + "\"" + property_name + "\"" + ": {\n" )
            object_state_arr.append(0)


    past_space_count = present_space_count

function_write_data(object_state_arr, 2)
fw.write("} \n")
